import { motion } from 'framer-motion'
import { AlertCircle, AlertTriangle, Shield } from 'lucide-react'
import { formatSeverity } from '@/lib/formatters'
import type { RiskItem, RiskSeverity } from '@/types/pitch'

type RiskRegisterCardProps = {
  risks: RiskItem[]
}

const severityOrder: Record<RiskSeverity, number> = { high: 0, medium: 1, low: 2 }

export function RiskRegisterCard({ risks }: RiskRegisterCardProps) {
  const sorted = [...(risks ?? [])].sort(
    (a, b) => severityOrder[a.severity] - severityOrder[b.severity],
  )

  if (!sorted.length) {
    return (
      <div className="glass-card p-6">
        <p className="text-sm text-ink-muted">No major risks found in this scan.</p>
      </div>
    )
  }

  return (
    <div className="glass-card p-6">
      <p className="mb-4 rounded-xl border border-gold/20 bg-gold/5 p-3 text-xs text-gold/90">
        Strategic risk intelligence for planning. Pair high severity items with qualified advisors before major commitments.
      </p>
      <div className="space-y-3">
        {sorted.map((risk, i) => (
          <motion.div
            key={`${risk.risk}-${i}`}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className={`rounded-xl p-4 risk-${risk.severity}`}
            style={{
              background:
                risk.severity === 'high'
                  ? 'rgba(248,113,113,0.04)'
                  : risk.severity === 'medium'
                    ? 'rgba(251,191,36,0.04)'
                    : 'rgba(52,211,153,0.04)',
            }}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0">
                {risk.severity === 'high' && <AlertTriangle size={15} className="text-red-400" />}
                {risk.severity === 'medium' && <AlertCircle size={15} className="text-amber-400" />}
                {risk.severity === 'low' && <Shield size={15} className="text-emerald-400" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-ink">{risk.risk}</span>
                  <span className={`badge ${risk.severity === 'high' ? 'badge-danger' : risk.severity === 'medium' ? 'badge-warning' : 'badge-success'}`}>
                    {formatSeverity(risk.severity)}
                  </span>
                  <span className="badge badge-violet">{risk.category}</span>
                </div>
                <p className="mb-2 text-xs leading-relaxed text-ink-muted">{risk.explanation}</p>
                {risk.mitigation && (
                  <div className="flex items-start gap-1.5">
                    <span className="shrink-0 font-mono text-xs text-accent">→</span>
                    <p className="text-xs text-accent/80">{risk.mitigation}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-5 border-t border-border/30 pt-4">
        <p className="text-center font-mono text-xs text-ink-muted">
          AI surface-level scan · Not legal or financial advice
        </p>
      </div>
    </div>
  )
}
