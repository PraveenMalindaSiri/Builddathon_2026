import { useState } from 'react'
import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import { Textarea } from '@/components/common/Textarea'
import { VoiceInputButton } from '@/components/pitch/VoiceInputButton'
import { submitRefineAnswer } from '@/services/pitchPipeline'
import type { RefineStepResponse } from '@/types/launchpad'

type RefineInterviewProps = {
  sessionId: string
  initialStep: RefineStepResponse
  onComplete: () => void
  onStepChange?: (step: RefineStepResponse) => void
  isSubmitting?: boolean
}

export function RefineInterview({
  sessionId,
  initialStep,
  onComplete,
  onStepChange,
  isSubmitting,
}: RefineInterviewProps) {
  const [step, setStep] = useState<RefineStepResponse>(initialStep)
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [questionNum, setQuestionNum] = useState(1)

  const handleSubmit = async () => {
    if (!answer.trim()) return
    setLoading(true)
    setError(null)
    try {
      const next = await submitRefineAnswer(sessionId, step.questionIndex, answer.trim())
      setAnswer('')
      if (next.done) {
        onComplete()
        return
      }
      setStep(next)
      onStepChange?.(next)
      setQuestionNum((n) => n + 1)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit answer')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card variant="elevated">
      <p className="text-xs font-medium uppercase tracking-wide text-accent">
        Question {questionNum} of 5
      </p>
      {step.category && <p className="mt-1 text-xs text-ink-muted">{step.category}</p>}
      {step.question && (
        <h3 className="mt-3 text-lg font-semibold text-ink">{step.question}</h3>
      )}
      {step.whyItMatters && (
        <p className="mt-2 text-sm text-ink-muted">{step.whyItMatters}</p>
      )}
      {step.audioUrl && (
        <audio className="mt-3 w-full" controls src={step.audioUrl}>
          Question audio
        </audio>
      )}
      {error && <p className="mt-2 text-sm text-warm">{error}</p>}
      <div className="mt-4">
        <Textarea
          label="Your answer"
          rows={4}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type or use voice to answer..."
          disabled={loading || isSubmitting}
        />
        <div className="mt-2">
          <VoiceInputButton
            onTranscript={(t) => {
              setAnswer((cur) => (cur.trim() ? `${cur.trim()} ${t}` : t))
            }}
          />
        </div>
      </div>
      <div className="mt-6">
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={loading || isSubmitting || !answer.trim()}
          className="w-full sm:w-auto"
        >
          {loading ? 'Submitting…' : 'Submit answer'}
        </Button>
      </div>
    </Card>
  )
}
