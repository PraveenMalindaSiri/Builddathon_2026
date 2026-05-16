import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { clampScore, getViabilityLabel } from '@/lib/formatters'
import type { ViabilityScore } from '@/types/pitch'

type ViabilityScoreCardProps = {
  data: ViabilityScore
}

function ScoreBar({
  label,
  value,
  invert,
}: {
  label: string
  value: number
  invert?: boolean
}) {
  const score = clampScore(value)
  const display = invert ? 100 - score : score
  const color = display >= 70 ? '#34d399' : display >= 50 ? '#fbbf24' : '#f87171'

  return (
    <div className="flex items-center gap-3">
      <div className="w-28 shrink-0 font-mono text-xs text-ink-muted">{label}</div>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-3">
        <motion.div
          className="progress-bar-fill h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          style={{ background: `linear-gradient(90deg, ${color}, ${color}99)` }}
        />
      </div>
      <div className="w-8 font-mono text-xs tabular-nums" style={{ color }}>{score}</div>
    </div>
  )
}

export function ViabilityScoreCard({ data }: ViabilityScoreCardProps) {
  const overall = clampScore(data.overall)
  const label = getViabilityLabel(overall)
  const badgeClass =
    overall >= 80
      ? 'badge-success'
      : overall >= 60
        ? 'badge-info'
        : overall >= 40
          ? 'badge-warning'
          : 'badge-danger'

  return (
    <div className="glass-card p-8">
      <div className="flex flex-col items-start gap-8 lg:flex-row">
        <div className="text-center lg:text-left">
          <p className="mb-2 font-mono text-xs tracking-widest text-ink-muted uppercase">
            Overall viability
          </p>
          <p className="score-display">
            <CountUp end={overall} duration={1.8} />
          </p>
          <p className="mt-1 font-mono text-sm text-ink-muted">/100</p>
          <p className="mt-3">
            <span className={`badge ${badgeClass}`}>{label}</span>
          </p>
        </div>
        <div className="flex-1 space-y-4">
          <ScoreBar label="Market Opp." value={data.marketOpportunity} />
          <ScoreBar label="Comp. Risk" value={data.competitiveRisk} invert />
          <ScoreBar label="Legal" value={data.legalComplexity} invert />
          <ScoreBar label="Differentiation" value={data.differentiation} />
          {data.founderFit !== undefined && (
            <ScoreBar label="Founder Fit" value={data.founderFit} />
          )}
        </div>
      </div>
      {data.summary && (
        <div className="mt-6 border-t border-border/40 pt-6">
          <p className="text-sm leading-relaxed text-ink-muted">{data.summary}</p>
        </div>
      )}
    </div>
  )
}
