import { Badge } from '@/components/common/Badge'
import { Card } from '@/components/common/Card'
import type { ClarifyingQuestion } from '@/types/pitch'

type ClarifyingQuestionsCardProps = {
  questions: ClarifyingQuestion[]
}

export function ClarifyingQuestionsCard({ questions }: ClarifyingQuestionsCardProps) {
  if (!questions.length) {
    return <Card><p className="text-sm text-ink-muted">No clarifying questions returned.</p></Card>
  }

  return (
    <div className="space-y-4">
      {questions.map((q, i) => (
        <Card key={`${q.category}-${i}`}>
          <Badge tone="info" className="mb-3">{q.category}</Badge>
          <p className="font-medium text-ink">{q.question}</p>
          {q.founderAnswer && (
            <p className="mt-3 rounded-lg border border-line bg-surface-elevated p-3 text-sm text-ink">
              <span className="font-medium text-ink-muted">Your answer: </span>
              {q.founderAnswer}
            </p>
          )}
          {q.whyItMatters && (
            <p className="mt-2 text-sm text-ink-muted">
              <span className="text-ink-muted">Why it matters: </span>
              {q.whyItMatters}
            </p>
          )}
          {q.suggestedAnswerDirection && (
            <p className="mt-2 text-sm text-accent/80">{q.suggestedAnswerDirection}</p>
          )}
        </Card>
      ))}
    </div>
  )
}
