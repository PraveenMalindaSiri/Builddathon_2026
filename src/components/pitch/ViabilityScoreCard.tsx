import { Card } from '@/components/common/Card'
import { clampScore, getViabilityLabel } from '@/lib/formatters'
import type { ViabilityScore } from '@/types/pitch'

type ViabilityScoreCardProps = {
  data: ViabilityScore
}

function ScoreBar({ label, value, invert }: { label: string; value: number; invert?: boolean }) {
  const score = clampScore(value)
  const width = `${score}%`
  const barColor = invert
    ? score > 60
      ? 'bg-amber-500'
      : 'bg-emerald-500'
    : 'bg-blue-500'

  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span className="text-ink-muted">{label}</span>
        <span className="font-medium text-ink-soft">{score}/100</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-surface-2">
        <div className={`h-full rounded-full ${barColor}`} style={{ width }} />
      </div>
    </div>
  )
}

export function ViabilityScoreCard({ data }: ViabilityScoreCardProps) {
  const overall = clampScore(data.overall)
  const label = getViabilityLabel(overall)

  return (
    <Card variant="elevated">
      <div className="text-center">
        <p className="text-5xl font-bold text-ink">{overall}</p>
        <p className="text-sm text-ink-muted">/ 100</p>
        <p className="mt-2 text-lg font-semibold text-accent">{label}</p>
      </div>
      <p className="mt-6 text-center text-sm text-ink-soft">{data.summary}</p>
      <div className="mt-8 space-y-4">
        <ScoreBar label="Market opportunity" value={data.marketOpportunity} />
        <ScoreBar label="Competitive risk (lower is safer)" value={data.competitiveRisk} invert />
        <ScoreBar label="Legal complexity" value={data.legalComplexity} invert />
        <ScoreBar label="Differentiation" value={data.differentiation} />
        {data.founderFit !== undefined && (
          <ScoreBar label="Founder fit" value={data.founderFit} />
        )}
      </div>
    </Card>
  )
}
