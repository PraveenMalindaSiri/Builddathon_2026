import { useCallback, useState } from 'react'
import { STORAGE_KEYS } from '@/config/constants'
import { generatePitch } from '@/services/pitchService'
import type { PitchGenerateRequest, PitchGenerationResult } from '@/types/pitch'
import type { ApiStatus } from '@/types/api'

export function usePitchGeneration() {
  const [status, setStatus] = useState<ApiStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<PitchGenerationResult | null>(() =>
    loadStoredResult(),
  )

  const generate = useCallback(async (request: PitchGenerateRequest) => {
    setStatus('loading')
    setError(null)
    try {
      localStorage.setItem(STORAGE_KEYS.lastPitchInput, JSON.stringify(request))
      const data = await generatePitch(request)
      setResult(data)
      localStorage.setItem(STORAGE_KEYS.lastPitchResult, JSON.stringify(data))
      setStatus('success')
      return data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Generation failed.'
      setError(message)
      setStatus('error')
      throw err
    }
  }, [])

  const reset = useCallback(() => {
    setStatus('idle')
    setError(null)
    setResult(null)
    localStorage.removeItem(STORAGE_KEYS.lastPitchResult)
  }, [])

  return { status, error, result, generate, reset, isLoading: status === 'loading' }
}

export function loadStoredResult(): PitchGenerationResult | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.lastPitchResult)
    return raw ? (JSON.parse(raw) as PitchGenerationResult) : null
  } catch {
    return null
  }
}

export function loadStoredInput(): PitchGenerateRequest | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.lastPitchInput)
    return raw ? (JSON.parse(raw) as PitchGenerateRequest) : null
  } catch {
    return null
  }
}
