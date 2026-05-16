import { ErrorState } from '@/components/common/ErrorState'
import { SectionHeader } from '@/components/common/SectionHeader'
import { JobProgress } from '@/components/jobs/JobProgress'
import { JobStepper } from '@/components/jobs/JobStepper'
import { PageShell } from '@/components/layout/PageShell'
import { PitchIdeaForm } from '@/components/pitch/PitchIdeaForm'
import { PitchProgress } from '@/components/pitch/PitchProgress'
import { RefineInterview } from '@/components/pitch/RefineInterview'
import { useActivePipeline } from '@/contexts/ActivePipelineContext'

export function PitchPage() {
  const {
    pitch,
    submitPitch,
    completePitchRefine,
    setPitchRefineStep,
    clearPitchError,
  } = useActivePipeline()

  const phase = pitch.phase === 'idle' ? 'form' : pitch.phase

  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeader
          title="Pitch Mode"
          description="Describe your business idea. We'll scan the market, interview you, and build your pitch package."
        />

        {pitch.error && (
          <div className="mb-6">
            <ErrorState message={pitch.error} onRetry={clearPitchError} />
          </div>
        )}

        {phase === 'form' && (
          <PitchIdeaForm onSubmit={(data) => void submitPitch(data)} isLoading={pitch.isBusy} />
        )}

        {phase === 'progress' && (
          <div className="py-8">
            <PitchProgress activeStep={pitch.progressStep} />
            <p className="mt-4 text-center text-sm text-ink-muted" aria-live="polite">
              Analyzing your idea…
            </p>
          </div>
        )}

        {phase === 'finishing' && (
          <div className="space-y-6 py-8">
            <PitchProgress activeStep={pitch.progressStep} />
            <JobProgress job={pitch.job} />
            <JobStepper job={pitch.job} />
          </div>
        )}

        {phase === 'refine' && pitch.sessionId && pitch.refineStep && (
          <RefineInterview
            sessionId={pitch.sessionId}
            initialStep={pitch.refineStep}
            onComplete={() => void completePitchRefine()}
            onStepChange={setPitchRefineStep}
            isSubmitting={pitch.isBusy}
          />
        )}
      </div>
    </PageShell>
  )
}
