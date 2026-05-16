import { env } from '@/config/env'
import { apiPost } from '@/lib/apiClient'
import { mockCampaignResult } from '@/services/mockCampaignResult'
import { delay } from '@/services/mockPitchResult'
import type {
  CampaignGenerateRequest,
  CampaignGenerationResult,
} from '@/types/campaign'

export async function generateCampaign(
  request: CampaignGenerateRequest,
): Promise<CampaignGenerationResult> {
  if (env.useMockApi) {
    await delay(2000)
    return mockCampaignResult
  }

  return apiPost<CampaignGenerateRequest, CampaignGenerationResult>(
    '/api/campaign/generate',
    request,
  )
}
