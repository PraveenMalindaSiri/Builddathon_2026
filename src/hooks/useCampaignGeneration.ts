import { useCallback } from 'react'
import { STORAGE_KEYS } from '@/config/constants'
import { useActivePipeline } from '@/contexts/ActivePipelineContext'
import { downloadCampaignZip } from '@/services/campaignService'
export function useCampaignGeneration() {
  const { campaign, generateCampaignJob } = useActivePipeline()

  const downloadZip = useCallback(async () => {
    const id = campaign.campaignId ?? localStorage.getItem(STORAGE_KEYS.campaignId)
    if (!id) return
    await downloadCampaignZip(id)
  }, [campaign.campaignId])

  return {
    status: campaign.status,
    error: campaign.error,
    result: campaign.result,
    job: campaign.job,
    campaignId: campaign.campaignId,
    generate: generateCampaignJob,
    downloadZip,
    isLoading: campaign.status === 'loading',
  }
}
