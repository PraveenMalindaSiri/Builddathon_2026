import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ErrorState } from '@/components/common/ErrorState'
import { SectionHeader } from '@/components/common/SectionHeader'
import { PageShell } from '@/components/layout/PageShell'
import { PitchIdeaForm } from '@/components/pitch/PitchIdeaForm'
import { PitchProgress } from '@/components/pitch/PitchProgress'
import { RefineInterview } from '@/components/pitch/RefineInterview'
import { STORAGE_KEYS } from '@/config/constants'
import {
  runCaptureAndAnalysis,
  submitRefineAnswers,
  type RefineQuestion,
} from '@/services/pitchPipeline'
import type { PitchGenerateRequest } from '@/types/pitch'

type Phase = 'form' | 'progress' | 'refine' | 'finishing'

export function PitchPage() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<Phase>('form')
  const [progressStep, setProgressStep] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [questions, setQuestions] = useState<RefineQuestion[]>([])
  const [isBusy, setIsBusy] = useState(false)

  const handleSubmit = async (data: PitchGenerateRequest) => {
    setError(null)
    setIsBusy(true)
    setPhase('progress')
    setProgressStep(0)
    try {
      localStorage.setItem(STORAGE_KEYS.lastPitchInput, JSON.stringify(data))
      const { sessionId: sid, questions: qs } = await runCaptureAndAnalysis(data, (step) =>
        setProgressStep(step),
      )
      setSessionId(sid)
      setQuestions(qs)
      setPhase('refine')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Pipeline failed')
      setPhase('form')
    } finally {
      setIsBusy(false)
    }
  }

  const handleRefineComplete = async (answers: string[]) => {
    if (!sessionId) return
    setError(null)
    setIsBusy(true)
    setPhase('finishing')
    setProgressStep(4)
    try {
      const result = await submitRefineAnswers(sessionId, answers, (step, _msg) =>
        setProgressStep(step),
      )
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

        {phase === 'form' && (
          <PitchIdeaForm onSubmit={handleSubmit} isLoading={isBusy} />
        )}

        {(phase === 'progress' || phase === 'finishing') && (
          <div className="py-8">
            <PitchProgress activeStep={progressStep} />
            <p className="mt-4 text-center text-sm text-slate-500" aria-live="polite">
              {phase === 'finishing'
                ? 'Scoring viability and building your pitch package…'
                : 'Analyzing your idea…'}
            </p>
          </div>
        )}

        {phase === 'refine' && (
          <RefineInterview
            questions={questions}
            onComplete={handleRefineComplete}
            isSubmitting={isBusy}
          />
        )}
      </div>
    </PageShell>
  )
}
