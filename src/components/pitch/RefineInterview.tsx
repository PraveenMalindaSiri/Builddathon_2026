import { useState } from 'react'
import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import { Textarea } from '@/components/common/Textarea'
import { VoiceInputButton } from '@/components/pitch/VoiceInputButton'
import type { RefineQuestion } from '@/services/pitchPipeline'

type RefineInterviewProps = {
  questions: RefineQuestion[]
  onComplete: (answers: string[]) => void
  isSubmitting?: boolean
}

export function RefineInterview({ questions, onComplete, isSubmitting }: RefineInterviewProps) {
  const list =
    questions.length > 0
      ? questions
      : [{ question: 'Tell us more about your target customer.' }]
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<string[]>(() => list.map(() => ''))
  const current = list[index]

  const setCurrentAnswer = (text: string) => {
    setAnswers((prev) => {
      const next = [...prev]
      next[index] = text
      return next
    })
  }

  const handleNext = () => {
    if (index < list.length - 1) {
      setIndex((i) => i + 1)
      return
    }
    onComplete(answers.slice(0, 5))
  }

  return (
    <Card variant="elevated">
      <p className="text-xs font-medium uppercase tracking-wide text-blue-400">
        Founder interview — question {index + 1} of {list.length}
      </p>
      {current.category && (
        <p className="mt-1 text-xs text-slate-500">{current.category}</p>
      )}
      <h3 className="mt-3 text-lg font-semibold text-slate-100">{current.question}</h3>
      {current.whyItMatters && (
        <p className="mt-2 text-sm text-slate-400">{current.whyItMatters}</p>
      )}
      <div className="mt-4">
        <Textarea
          label="Your answer"
          rows={4}
          value={answers[index] ?? ''}
          onChange={(e) => setCurrentAnswer(e.target.value)}
          placeholder="Type or use voice to answer..."
        />
        <div className="mt-2">
          <VoiceInputButton
            onTranscript={(t) => {
              const cur = answers[index]?.trim() ?? ''
              setCurrentAnswer(cur ? `${cur} ${t}` : t)
            }}
          />
        </div>
      </div>
      <div className="mt-6 flex justify-between gap-3">
        <Button
          type="button"
          variant="ghost"
          disabled={index === 0}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          disabled={isSubmitting || !(answers[index]?.trim().length ?? 0)}
        >
          {index < list.length - 1 ? 'Next question' : 'Finish interview'}
        </Button>
      </div>
    </Card>
  )
}
