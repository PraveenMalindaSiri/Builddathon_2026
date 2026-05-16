import { BarChart3, CheckCircle2, Lightbulb, ShieldAlert } from 'lucide-react'

const rows = [
  { icon: BarChart3, label: 'Market', value: 'Crowded but possible', tone: 'badge-warning' },
  { icon: ShieldAlert, label: 'Risks Found', value: '3 flags', tone: 'badge-danger' },
  { icon: Lightbulb, label: 'Pitch Slides', value: '10 ready', tone: 'badge-info' },
  { icon: CheckCircle2, label: 'Investor Q&As', value: '20 coached', tone: 'badge-success' },
] as const

export function MockPitchPreviewCard() {
  return (
    <div className="gradient-border relative scanline rounded-2xl p-px">
      <div className="glass-card rounded-2xl p-6" style={{ background: 'rgba(7, 13, 26, 0.95)' }}>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="mb-1 text-xs font-mono text-ink-muted">PITCH PACKAGE</p>
            <p className="font-display text-lg font-bold text-ink">RuralTutor AI</p>
          </div>
          <span className="badge badge-success">Generated</span>
        </div>
        <div className="mb-5 flex items-center gap-4 rounded-xl p-4" style={{ background: 'rgba(56,189,248,0.05)', border: '1px solid rgba(56,189,248,0.1)' }}>
          <div>
            <p className="font-display text-4xl font-extrabold gradient-text">74</p>
            <p className="text-xs text-ink-muted font-mono">/100</p>
          </div>
          <div className="flex-1">
            <p className="mb-1 text-sm font-semibold text-ink">Strong Potential</p>
            <div className="h-1.5 rounded-full bg-surface-3 overflow-hidden">
              <div className="progress-bar-fill h-full" style={{ width: '74%' }} />
            </div>
          </div>
        </div>
        <div className="space-y-2.5 mb-5">
          {rows.map(({ icon: Icon, label, value, tone }) => (
            <div key={label} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-ink-muted">
                <Icon size={13} className="text-ink-muted" />
                <span className="font-mono text-xs">{label}</span>
              </div>
              <span className={`badge ${tone}`}>{value}</span>
            </div>
          ))}
        </div>
        <div className="pt-4 border-t border-border/40">
          <p className="text-xs font-mono text-ink-muted text-center">Powered by MiniMax · PitchSmash</p>
        </div>
      </div>
    </div>
  )
}