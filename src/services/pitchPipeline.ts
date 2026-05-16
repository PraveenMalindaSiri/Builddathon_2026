import { STORAGE_KEYS } from '@/config/constants'
import { env } from '@/config/env'
import { buildTranscript } from '@/lib/buildTranscript'
import { apiPost } from '@/lib/apiClient'
import { pollJob } from '@/services/jobService'
import { getPitchResult } from '@/services/sessionService'
import { delay, mockPitchResult } from '@/services/mockPitchResult'
import type {
  CaptureResponse,
  PitchJobResponse,
  RefineStartResponse,
} from '@/types/backend'
import type { PitchGenerateRequest, PitchGenerationResult } from '@/types/pitch'

export type RefineQuestion = {
  category?: string
  question: string
  whyItMatters?: string
}

export type PipelineProgressHandler = (stepIndex: number, message?: string) => void

export async function runCaptureAndAnalysis(
  form: PitchGenerateRequest,
  onProgress: PipelineProgressHandler,
): Promise<{ sessionId: string; questions: RefineQuestion[] }> {
  if (env.useMockApi) {
    onProgress(0)
    await delay(800)
    onProgress(1)
    await delay(800)
    onProgress(2)
    await delay(800)
    onProgress(3)
    await delay(500)
    const sessionId = `mock_${Date.now()}`
    localStorage.setItem(STORAGE_KEYS.sessionId, sessionId)
    return {
      sessionId,
      questions: mockPitchResult.clarifyingQuestions.map((q) => ({
        category: q.category,
        question: q.question,
        whyItMatters: q.whyItMatters,
      })),
    }
  }

  const transcript = buildTranscript(form)

  onProgress(0)
  const capture = await apiPost<{ transcript: string }, CaptureResponse>('/api/capture', {
    transcript,
  })
  const sessionId = capture.sessionId
  localStorage.setItem(STORAGE_KEYS.sessionId, sessionId)

  onProgress(1)
  await apiPost('/api/scan', { sessionId })

  onProgress(2)
  await apiPost('/api/audit', { sessionId })

  onProgress(3)
  const refine = await apiPost<{ sessionId: string }, RefineStartResponse>(
    '/api/refine/start',
    { sessionId },
  )

  const questions = refine.questions ?? []
  return { sessionId, questions }
}

export async function submitRefineAnswers(
  sessionId: string,
  answers: string[],
  onProgress: PipelineProgressHandler,
): Promise<PitchGenerationResult> {
  if (env.useMockApi) {
    onProgress(4)
    await delay(600)
    onProgress(5)
    await delay(1500)
    onProgress(6)
    await delay(1000)
    const result = {
      ...mockPitchResult,
      sessionId,
      createdAt: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE_KEYS.lastPitchResult, JSON.stringify(result))
    return result
  }

  const count = Math.min(answers.length, 5)
  for (let i = 0; i < count; i++) {
    await apiPost('/api/refine/answer', {
      sessionId,
      questionIndex: i,
      answerTranscript: answers[i] || 'No answer provided.',
    })
  }

  onProgress(4)
  await apiPost('/api/refine/complete', { sessionId })

  onProgress(5)
  await apiPost('/api/validate', { sessionId })

  onProgress(6)
  const pitchJob = await apiPost<{ sessionId: string }, PitchJobResponse>('/api/pitch', {
    sessionId,
  })
  localStorage.setItem(STORAGE_KEYS.jobId, pitchJob.jobId)

  onProgress(6, pitchJob.status)
  await pollJob(pitchJob.jobId, (p) => onProgress(6, p))

  const result = await getPitchResult(sessionId)
  localStorage.setItem(STORAGE_KEYS.lastPitchResult, JSON.stringify(result))
  return result
}
