import { STORAGE_KEYS } from '@/config/constants'
import { env } from '@/config/env'
import { buildTranscript } from '@/lib/buildTranscript'
import { apiPost } from '@/lib/apiClient'
import { pollJob } from '@/services/jobService'
import { getPitchResult } from '@/services/sessionService'
import { mergePitchJobResult } from '@/services/sessionMapper'
import { delay, mockPitchResult } from '@/services/mockPitchResult'
import type { CaptureResponse } from '@/types/backend'
import type {
  JobPollResponse,
  PitchJobResult,
  RefineStepResponse,
} from '@/types/launchpad'
import type { PitchGenerateRequest, PitchGenerationResult } from '@/types/pitch'

export type PipelineProgressHandler = (stepIndex: number, message?: string) => void
export type JobUpdateHandler = (job: JobPollResponse) => void

const MOCK_REFINE_QUESTIONS = [
  'Who is your first target customer?',
  'How will you make money in the first year?',
  'What stops a competitor from copying you?',
  'How will your first 100 customers find you?',
  'Why are you the right founder for this?',
]

export async function runCaptureAndAnalysis(
  form: PitchGenerateRequest,
  onProgress: PipelineProgressHandler,
): Promise<{ sessionId: string; refineStep: RefineStepResponse }> {
  if (env.useMockApi) {
    onProgress(0)
    await delay(800)
    onProgress(1)
    await delay(800)
    onProgress(2)
    await delay(800)
    onProgress(3)
    await delay(400)
    const sessionId = `mock_${Date.now()}`
    localStorage.setItem(STORAGE_KEYS.sessionId, sessionId)
    return {
      sessionId,
      refineStep: {
        questionIndex: 0,
        question: MOCK_REFINE_QUESTIONS[0],
        done: false,
      },
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
  const refine = await apiPost<{ sessionId: string }, RefineStepResponse>(
    '/api/refine/start',
    { sessionId },
  )

  return { sessionId, refineStep: refine }
}

export async function submitRefineAnswer(
  sessionId: string,
  questionIndex: number,
  answerTranscript: string,
): Promise<RefineStepResponse> {
  if (env.useMockApi) {
    await delay(400)
    const next = questionIndex + 1
    if (next >= MOCK_REFINE_QUESTIONS.length) {
      return { questionIndex: next, question: '', done: true }
    }
    return {
      questionIndex: next,
      question: MOCK_REFINE_QUESTIONS[next],
      done: false,
    }
  }

  return apiPost('/api/refine/answer', {
    sessionId,
    questionIndex,
    answerTranscript,
  })
}

export async function completePipelineAfterRefine(
  sessionId: string,
  onProgress: PipelineProgressHandler,
  onJobUpdate?: JobUpdateHandler,
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

  onProgress(4)
  await apiPost('/api/refine/complete', { sessionId })

  onProgress(5)
  await apiPost('/api/validate', { sessionId })

  onProgress(6)
  const pitchStart = await apiPost<
    { sessionId: string },
    {
      jobId: string
      status: string
      progress?: string
      stages?: JobPollResponse['stages']
    }
  >('/api/pitch', { sessionId })

  localStorage.setItem(STORAGE_KEYS.jobId, pitchStart.jobId)

  const initialJob: JobPollResponse = {
    jobId: pitchStart.jobId,
    type: 'pitch',
    status: 'processing',
    progress: pitchStart.progress ?? 'queued',
    progressLabel: 'Queued',
    progressIndex: 0,
    progressTotal: pitchStart.stages?.length ?? 7,
    progressPercent: 0,
    stages: pitchStart.stages ?? [],
    result: null,
    error: null,
  }
  onJobUpdate?.(initialJob)

  const jobResult = await pollJob<PitchJobResult>(pitchStart.jobId, (job) => {
    onJobUpdate?.(job)
    onProgress(6, job.progressLabel)
  })

  let result = await getPitchResult(sessionId)
  result = mergePitchJobResult(result, jobResult)

  if (jobResult.audioUrl) {
    result.audioUrl = jobResult.audioUrl
  }

  localStorage.setItem(STORAGE_KEYS.lastPitchResult, JSON.stringify(result))
  return result
}
