import { STORAGE_KEYS } from '@/config/constants'
import { env } from '@/config/env'
import { apiGet, apiPost, getToken } from '@/lib/apiClient'
import { mapCampaignRecord, mapJobResultToCampaign } from '@/services/campaignMapper'
import { pollJob } from '@/services/jobService'
import { mockCampaignResult } from '@/services/mockCampaignResult'
import { delay } from '@/services/mockPitchResult'
import type { CampaignStartResponse } from '@/types/backend'
import type { CampaignJobResult, CampaignRecord, JobPollResponse } from '@/types/pitchsmash'
import type { CampaignGenerationResult } from '@/types/campaign'

const MAX_REFERENCE_IMAGE_BYTES = 5 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export type CampaignRequest = {
  description: string
  productUrl?: string
  tone: 'energetic' | 'professional' | 'emotional' | 'funny'
  platform?: string
  referenceImage?: File
  referenceImageUrl?: string
}

export type CampaignGenerateOutput = {
  result: CampaignGenerationResult
  campaignId?: string
  initialJob?: JobPollResponse
}

export { mapJobResultToCampaign, mapCampaignRecord }

async function startCampaignApi(
  description: string,
  tone: CampaignRequest['tone'],
  productUrl?: string,
  referenceImage?: File,
  referenceImageUrl?: string,
): Promise<CampaignStartResponse & { stages?: JobPollResponse['stages'] }> {
  const base = env.apiUrl
  const token = getToken()

  if (referenceImage) {
    if (referenceImage.size > MAX_REFERENCE_IMAGE_BYTES) {
      throw new Error('Reference image must be 5 MB or smaller.')
    }
    if (!ALLOWED_IMAGE_TYPES.includes(referenceImage.type)) {
      throw new Error('Reference image must be JPEG, PNG, or WebP.')
    }

    const form = new FormData()
    form.append('description', description)
    form.append('tone', tone)
    if (productUrl) form.append('productUrl', productUrl)
    form.append('referenceImage', referenceImage)

    const res = await fetch(`${base}/api/campaign`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: form,
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      throw new Error((data as { message?: string }).message || 'Campaign start failed')
    }
    return data as CampaignStartResponse & { stages?: JobPollResponse['stages'] }
  }

  return apiPost<
    {
      description: string
      tone: string
      productUrl?: string
      referenceImageUrl?: string
    },
    CampaignStartResponse & { stages?: JobPollResponse['stages'] }
  >('/api/campaign', {
    description,
    tone,
    productUrl,
    referenceImageUrl,
  })
}

export async function getCampaign(campaignId: string): Promise<CampaignGenerationResult> {
  if (env.useMockApi) {
    return mockCampaignResult
  }
  const record = await apiGet<CampaignRecord>(`/api/campaign/${campaignId}`)
  return mapCampaignRecord(record)
}

export async function generateCampaign(
  request: CampaignRequest,
  onJobUpdate?: (job: JobPollResponse) => void,
): Promise<CampaignGenerateOutput> {
  let description = request.description
  if (request.platform && request.platform !== 'All') {
    description += `\nTarget platform: ${request.platform}`
  }

  if (env.useMockApi) {
    await delay(2000)
    return { result: mockCampaignResult, campaignId: `mock_campaign_${Date.now()}` }
  }

  const start = await startCampaignApi(
    description,
    request.tone,
    request.productUrl,
    request.referenceImage,
    request.referenceImageUrl,
  )

  localStorage.setItem(STORAGE_KEYS.campaignId, start.campaignId)
  localStorage.setItem(STORAGE_KEYS.jobId, start.jobId)

  const initialJob: JobPollResponse = {
    jobId: start.jobId,
    type: 'campaign',
    status: 'processing',
    progress: start.progress ?? 'queued',
    progressLabel: 'Queued',
    progressIndex: 0,
    progressTotal: start.stages?.length ?? 8,
    progressPercent: 0,
    stages: start.stages ?? [],
    result: null,
    error: null,
  }
  onJobUpdate?.(initialJob)

  const jobResult = await pollJob<CampaignJobResult>(start.jobId, onJobUpdate)
  const mapped = mapJobResultToCampaign(jobResult)
  if (start.referenceImageUrl && !mapped.referenceImageUrl) {
    mapped.referenceImageUrl = start.referenceImageUrl
  }

  const campaignId = start.campaignId ?? jobResult.campaignId

  return {
    result: mapped,
    campaignId,
    initialJob,
  }
}

export async function downloadCampaignZip(campaignId: string) {
  const token = getToken()
  const res = await fetch(`${env.apiUrl}/api/campaign/${campaignId}/download`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error((body as { message?: string }).message || `Download failed (${res.status})`)
  }
  const filename =
    res.headers.get('X-Filename') || `PitchSmash-Campaign-${campaignId}.zip`
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
