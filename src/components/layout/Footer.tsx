import { IconGlobe } from '@/components/icons/Icons'

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface/40 py-10 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 text-center sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-ink-muted">
          <IconGlobe size={16} className="text-accent" />
          <span className="text-sm">Built for founders worldwide</span>
        </div>
        <p className="text-xs text-ink-muted/80">
          PitchSmash · Venture intelligence from idea to investor ready
        </p>
      </div>
    </footer>
  )
}
