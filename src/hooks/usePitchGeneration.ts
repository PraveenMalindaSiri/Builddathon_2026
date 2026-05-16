import { STORAGE_KEYS } from '@/config/constants'
import type { PitchGenerateRequest, PitchGenerationResult } from '@/types/pitch'

/** @deprecated Use pitchPipeline + sessionService for generation */
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
