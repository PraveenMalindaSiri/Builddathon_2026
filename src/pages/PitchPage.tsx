import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { ErrorState } from '@/components/common/ErrorState'
import { SectionHeader } from '@/components/common/SectionHeader'
import { JobProgress } from '@/components/jobs/JobProgress'
import { JobStepper } from '@/components/jobs/JobStepper'
import { PageShell } from '@/components/layout/PageShell'
import { PitchIdeaForm } from '@/components/pitch/PitchIdeaForm'
import { PitchProgress } from '@/components/pitch/PitchProgress'
import { RefineInterview } from '@/components/pitch/RefineInterview'
import { STORAGE_KEYS } from '@/config/constants'
import {
  runCaptureAndAnalysis,
  completePipelineAfterRefine,
} from '@/services/pitchPipeline'
import type { JobPollResponse } from '@/types/launchpad'
import type { RefineStepResponse } from '@/types/launchpad'
import type { PitchGenerateRequest } from '@/types/pitch'

type Phase = 'form' | 'progress' | 'refine' | 'finishing'

export function PitchPage() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<Phase>('form')
  const [progressStep, setProgressStep] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [refineStep, setRefineStep] = useState<RefineStepResponse | null>(null)
  const [job, setJob] = useState<JobPollResponse | null>(null)
  const [isBusy, setIsBusy] = useState(false)

  const handleSubmit = async (data: PitchGenerateRequest) => {
    setError(null)
    setIsBusy(true)
    setPhase('progress')
    setProgressStep(0)
    try {
      localStorage.setItem(STORAGE_KEYS.lastPitchInput, JSON.stringify(data))
      const { sessionId: sid, refineStep: step } = await runCaptureAndAnalysis(data, (s) =>
        setProgressStep(s),
      )
      setSessionId(sid)
      setRefineStep(step)
      setPhase('refine')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Pipeline failed'
      setError(msg)
      if (msg.includes('INVALID_STATE')) {
        setError('Complete the founder interview before generating the pitch.')
      }
      setPhase('form')
    } finally {
      setIsBusy(false)
    }
  }

  const handleRefineComplete = async () => {
    if (!sessionId) return
    setError(null)
    setIsBusy(true)
    setPhase('finishing')
    setProgressStep(4)
    setJob(null)
    try {
      const result = await completePipelineAfterRefine(
        sessionId,
        (step) => setProgressStep(step),
        setJob,
      )

      if (result.audioWarning && !result.audioUrl) {
        toast.warning('Pitch ready — voice audio could not be generated.', {
          description: result.audioWarning,
        })
      }

      navigate(`/pitch/result/${sessionId}`, { state: { result } })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete pitch')
      setPhase('refine')
    } finally {
      setIsBusy(false)
    }
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeader
          title="Pitch Mode"
          description="Describe your business idea. We'll scan the market, interview you, and build your pitch package."
        />

        {error && (
          <div className="mb-6">
            <ErrorState message={error} onRetry={() => setError(null)} />
          </div>
        )}

        {phase === 'form' && <PitchIdeaForm onSubmit={handleSubmit} isLoading={isBusy} />}

        {phase === 'progress' && (
          <div className="py-8">
            <PitchProgress activeStep={progressStep} />
            <p className="mt-4 text-center text-sm text-slate-500" aria-live="polite">
              Analyzing your idea…
            </p>
          </div>
        )}

        {phase === 'finishing' && (
          <div className="py-8 space-y-6">
            <PitchProgress activeStep={progressStep} />
            <JobProgress job={job} />
            <JobStepper job={job} />
          </div>
        )}

        {phase === 'refine' && sessionId && refineStep && (
          <RefineInterview
            sessionId={sessionId}
            initialStep={refineStep}
            onComplete={handleRefineComplete}
            isSubmitting={isBusy}
          />
        )}
      </div>
    </PageShell>
  )
}
