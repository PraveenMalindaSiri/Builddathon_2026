import { useCallback, useState } from 'react'
import { STORAGE_KEYS } from '@/config/constants'
import { generateCampaign } from '@/services/campaignService'
import type { CampaignGenerateRequest, CampaignGenerationResult } from '@/types/campaign'
import type { ApiStatus } from '@/types/api'

export function useCampaignGeneration() {
  const [status, setStatus] = useState<ApiStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<CampaignGenerationResult | null>(null)

  const generate = useCallback(async (request: CampaignGenerateRequest) => {
    setStatus('loading')
    setError(null)
    try {
      localStorage.setItem(STORAGE_KEYS.lastCampaignInput, JSON.stringify(request))
      const data = await generateCampaign(request)
      setResult(data)
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

  return { status, error, result, generate, isLoading: status === 'loading' }
}
