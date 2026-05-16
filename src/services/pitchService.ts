/**
 * Legacy entry — prefer pitchPipeline + sessionService for live backend.
 */
import { getPitchResult } from '@/services/sessionService'
import {
  runCaptureAndAnalysis,
  submitRefineAnswers,
  type PipelineProgressHandler,
} from '@/services/pitchPipeline'
import type { PitchGenerateRequest, PitchGenerationResult } from '@/types/pitch'

export { runCaptureAndAnalysis, submitRefineAnswers }
export type { PipelineProgressHandler }

export async function fetchPitchResult(sessionId: string): Promise<PitchGenerationResult> {
  return getPitchResult(sessionId)
}

export type PitchPipelineStart = PitchGenerateRequest
