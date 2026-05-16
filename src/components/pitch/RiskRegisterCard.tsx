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
      <p className="mb-4 rounded-xl border border-gold/20 bg-gold/5 p-3 text-xs text-gold/90">
        Strategic risk intelligence for planning. Pair high severity items with qualified advisors before major commitments.
      </p>
      {!sorted.length ? (
        <Card>
          <p className="text-sm text-ink-muted">No major risks found in this scan.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {sorted.map((r, i) => (
            <Card key={`${r.risk}-${i}`}>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge tone={severityTone(r.severity)}>{formatSeverity(r.severity)}</Badge>
                <Badge>{r.category}</Badge>
              </div>
              <h4 className="font-medium text-ink">{r.risk}</h4>
              <p className="mt-2 text-sm text-ink-muted">{r.explanation}</p>
              {r.mitigation && (
                <p className="mt-3 text-sm text-ink-soft">
                  <span className="font-medium text-ink-soft">Mitigation: </span>
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
