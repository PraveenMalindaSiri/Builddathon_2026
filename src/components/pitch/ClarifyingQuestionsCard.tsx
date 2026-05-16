import { Badge } from '@/components/common/Badge'
import { Card } from '@/components/common/Card'
import type { ClarifyingQuestion } from '@/types/pitch'

type ClarifyingQuestionsCardProps = {
  questions: ClarifyingQuestion[]
}

export function ClarifyingQuestionsCard({ questions }: ClarifyingQuestionsCardProps) {
  if (!questions.length) {
    return <Card><p className="text-sm text-slate-400">No clarifying questions returned.</p></Card>
  }

  return (
    <div className="space-y-4">
      {questions.map((q, i) => (
        <Card key={`${q.category}-${i}`}>
          <Badge tone="info" className="mb-3">{q.category}</Badge>
          <p className="font-medium text-slate-100">{q.question}</p>
          {q.whyItMatters && (
            <p className="mt-2 text-sm text-slate-400">
              <span className="text-slate-500">Why it matters: </span>
              {q.whyItMatters}
            </p>
          )}
          {q.suggestedAnswerDirection && (
            <p className="mt-2 text-sm text-blue-300/80">{q.suggestedAnswerDirection}</p>
          )}
        </Card>
      ))}
    </div>
  )
}
