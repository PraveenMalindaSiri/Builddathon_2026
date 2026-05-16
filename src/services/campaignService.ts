import { STORAGE_KEYS } from '@/config/constants'
import { env } from '@/config/env'
import { apiPost, downloadBlob } from '@/lib/apiClient'
import { pollJob } from '@/services/jobService'
import { mockCampaignResult } from '@/services/mockCampaignResult'
import { delay } from '@/services/mockPitchResult'
import type { CampaignStartResponse } from '@/types/backend'
import type { CampaignJobResult, JobPollResponse } from '@/types/launchpad'
import type { CampaignGenerationResult } from '@/types/campaign'

export type CampaignRequest = {
  description: string
  productUrl?: string
  tone: 'energetic' | 'professional' | 'emotional' | 'funny'
  platform?: string
}

function mapJobResultToCampaign(result: CampaignJobResult): CampaignGenerationResult {
  const heroRaw = result.heroCopy
  let headline = 'Campaign headline'
  let subheadline = ''
  if (typeof heroRaw === 'string') {
    headline = heroRaw
  } else if (heroRaw && typeof heroRaw === 'object') {
    const h = heroRaw as Record<string, string>
    headline = h.headline || headline
    subheadline = h.subheadline || h.sub_headline || ''
  }

  const captions = result.captions ?? {}
  const socialCaptions: CampaignGenerationResult['socialCaptions'] = []
  if (captions.instagram) socialCaptions.push({ platform: 'Instagram', caption: captions.instagram })
  if (captions.tiktok) socialCaptions.push({ platform: 'TikTok', caption: captions.tiktok })
  if (captions.twitter) socialCaptions.push({ platform: 'X', caption: captions.twitter })

  const emailRaw = result.emailCopy
  let emailCopy: CampaignGenerationResult['emailCopy'] = { subject: '', body: '' }
  if (typeof emailRaw === 'string') {
    emailCopy = { subject: 'Campaign update', body: emailRaw }
  } else if (emailRaw && typeof emailRaw === 'object') {
    emailCopy = emailRaw as CampaignGenerationResult['emailCopy']
  }

  let adScript: CampaignGenerationResult['adScript'] = {
    duration: '30 seconds',
    script: '',
  }
  const adScriptRaw = result.adScript
  if (typeof adScriptRaw === 'string') {
    adScript = { duration: '30 seconds', script: adScriptRaw }
  } else if (adScriptRaw && typeof adScriptRaw === 'object') {
    adScript = adScriptRaw as CampaignGenerationResult['adScript']
  }

  return {
    taglines: result.taglines ?? [],
    heroCopy: { headline, subheadline },
    socialCaptions,
    emailCopy,
    adScript,
    bannerUrl: result.bannerUrl ?? undefined,
    audioUrl: result.audioUrl ?? undefined,
    videoUrl: result.videoUrl ?? undefined,
  }
}

export type CampaignGenerateOutput = {
  result: CampaignGenerationResult
  campaignId?: string
  initialJob?: JobPollResponse
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
    return { result: mockCampaignResult }
  }

  const start = await apiPost<
    { description: string; tone: string; productUrl?: string },
    CampaignStartResponse & { stages?: JobPollResponse['stages'] }
  >('/api/campaign', {
    description,
    tone: request.tone,
    productUrl: request.productUrl,
  })

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
  const result =
    jobResult && Object.keys(jobResult).length > 0
      ? mapJobResultToCampaign(jobResult)
      : mockCampaignResult

  return {
    result,
    campaignId: start.campaignId ?? jobResult.campaignId,
    initialJob,
  }
}

export async function downloadCampaignZip(campaignId: string) {
  const blob = await downloadBlob(`/api/campaign/${campaignId}/download`)
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `launchpad-campaign-${campaignId}.zip`
  a.click()
  URL.revokeObjectURL(url)
}
