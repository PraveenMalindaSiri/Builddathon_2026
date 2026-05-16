import { STORAGE_KEYS } from '@/config/constants'
import { env } from '@/config/env'
import { apiPost, downloadBlob } from '@/lib/apiClient'
import { pollJob } from '@/services/jobService'
import { mockCampaignResult } from '@/services/mockCampaignResult'
import { delay } from '@/services/mockPitchResult'
import type { CampaignStartResponse } from '@/types/backend'
import type { CampaignGenerationResult } from '@/types/campaign'

export type CampaignRequest = {
  description: string
  productUrl?: string
  tone: 'energetic' | 'professional' | 'emotional' | 'funny'
  platform?: string
}

function mapJobResultToCampaign(result: Record<string, unknown>): CampaignGenerationResult {
  const hero = (result.heroCopy ?? result.hero_copy) as Record<string, string> | undefined
  return {
    taglines: Array.isArray(result.taglines) ? (result.taglines as string[]) : [],
    heroCopy: {
      headline: hero?.headline || 'Campaign headline',
      subheadline: hero?.subheadline || hero?.sub_headline || '',
    },
    socialCaptions: Array.isArray(result.socialCaptions ?? result.social_captions)
      ? ((result.socialCaptions ?? result.social_captions) as Array<{
          platform: string
          caption: string
        }>)
      : [],
    emailCopy: (result.emailCopy ?? result.email_copy ?? {
      subject: '',
      body: '',
    }) as CampaignGenerationResult['emailCopy'],
    adScript: (result.adScript ?? result.ad_script ?? {
      duration: '30 seconds',
      script: '',
    }) as CampaignGenerationResult['adScript'],
  }
}

export async function generateCampaign(
  request: CampaignRequest,
  onProgress?: (msg?: string) => void,
): Promise<{ result: CampaignGenerationResult; campaignId?: string }> {
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
    CampaignStartResponse
  >('/api/campaign', {
    description,
    tone: request.tone,
    productUrl: request.productUrl,
  })

  localStorage.setItem(STORAGE_KEYS.campaignId, start.campaignId)
  localStorage.setItem(STORAGE_KEYS.jobId, start.jobId)

  const jobResult = await pollJob<Record<string, unknown>>(start.jobId, onProgress)
  const result =
    Object.keys(jobResult).length > 0
      ? mapJobResultToCampaign(jobResult)
      : mockCampaignResult

  return { result, campaignId: start.campaignId }
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
