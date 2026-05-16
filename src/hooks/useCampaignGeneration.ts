import { useCallback, useState } from 'react'
import { STORAGE_KEYS } from '@/config/constants'
import {
  generateCampaign,
  downloadCampaignZip,
  type CampaignRequest,
} from '@/services/campaignService'
import type { CampaignGenerationResult } from '@/types/campaign'
import type { ApiStatus } from '@/types/api'

export function useCampaignGeneration() {
  const [status, setStatus] = useState<ApiStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<CampaignGenerationResult | null>(null)
  const [progress, setProgress] = useState<string | undefined>()
  const [campaignId, setCampaignId] = useState<string | null>(null)

  const generate = useCallback(async (request: CampaignRequest) => {
    setStatus('loading')
    setError(null)
    setProgress(undefined)
    try {
      localStorage.setItem(STORAGE_KEYS.lastCampaignInput, JSON.stringify(request))
      const { result: data, campaignId: cid } = await generateCampaign(request, setProgress)
      setResult(data)
      setCampaignId(cid ?? null)
      if (cid) localStorage.setItem(STORAGE_KEYS.campaignId, cid)
      localStorage.setItem(STORAGE_KEYS.lastCampaignResult, JSON.stringify(data))
      setStatus('success')
      return data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Generation failed.'
      setError(message)
      setStatus('error')
      throw err
    }
  }, [])

  const downloadZip = useCallback(async () => {
    const id = campaignId ?? localStorage.getItem(STORAGE_KEYS.campaignId)
    if (!id) return
    await downloadCampaignZip(id)
  }, [campaignId])

  return {
    status,
    error,
    result,
    progress,
    campaignId,
    generate,
    downloadZip,
    isLoading: status === 'loading',
  }
}
