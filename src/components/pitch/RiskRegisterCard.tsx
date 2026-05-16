import { Badge } from '@/components/common/Badge'
import { Card } from '@/components/common/Card'
import { formatSeverity } from '@/lib/formatters'
import type { RiskItem, RiskSeverity } from '@/types/pitch'

type RiskRegisterCardProps = {
  risks: RiskItem[]
}

function severityTone(severity: RiskSeverity): 'danger' | 'warning' | 'success' {
  if (severity === 'high') return 'danger'
  if (severity === 'medium') return 'warning'
  return 'success'
}

const severityOrder: Record<RiskSeverity, number> = { high: 0, medium: 1, low: 2 }

export function RiskRegisterCard({ risks }: RiskRegisterCardProps) {
  const sorted = [...(risks ?? [])].sort(
    (a, b) => severityOrder[a.severity] - severityOrder[b.severity],
  )

  return (
    <div>
      <p className="mb-4 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-amber-200/90">
        This scan is AI-generated and surface-level. It is not legal, financial, or professional
        advice. Consult experts for high-risk flags.
      </p>
      {!sorted.length ? (
        <Card>
          <p className="text-sm text-slate-400">No major risks found in this scan.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {sorted.map((r, i) => (
            <Card key={`${r.risk}-${i}`}>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge tone={severityTone(r.severity)}>{formatSeverity(r.severity)}</Badge>
                <Badge>{r.category}</Badge>
              </div>
              <h4 className="font-medium text-slate-100">{r.risk}</h4>
              <p className="mt-2 text-sm text-slate-400">{r.explanation}</p>
              {r.mitigation && (
                <p className="mt-3 text-sm text-slate-300">
                  <span className="font-medium text-slate-200">Mitigation: </span>
                  {r.mitigation}
                </p>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
