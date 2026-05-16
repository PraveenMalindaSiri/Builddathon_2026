import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import {
  IconCampaign,
  IconChart,
  IconIdea,
  IconLaunch,
  IconMessage,
  IconMic,
  IconPitch,
  IconShield,
  IconSpark,
} from '@/components/icons/Icons'
import { PageShell } from '@/components/layout/PageShell'
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal'

const features = [
  {
    icon: IconMic,
    title: 'Voice first capture',
    desc: 'Capture your vision by speaking or typing. Zero friction from thought to structured concept.',
  },
  {
    icon: IconChart,
    title: 'Market intelligence',
    desc: 'Competitive landscape, opportunity signals, and positioning insights in one view.',
  },
  {
    icon: IconPitch,
    title: 'Investor grade deck',
    desc: 'Layout aware slides with visuals, presenter mode, and export ready PowerPoint.',
  },
  {
    icon: IconMessage,
    title: 'Investor Q&A prep',
    desc: 'Anticipate tough questions with frameworks that help you answer with confidence.',
  },
]

const stats = [
  { label: 'Pipeline steps', value: '10+' },
  { label: 'Deck layouts', value: '5' },
  { label: 'Export formats', value: '4' },
  { label: 'Global ready', value: '100%' },
]

export function HomePage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute left-1/2 top-20 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-accent/8 blur-[120px]" />
        <div className="relative mx-auto grid max-w-7xl gap-16 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-28 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
              <IconSpark size={14} />
              Venture intelligence platform
            </div>
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-gradient-hero">LaunchPad</span>
              <br />
              <span className="text-ink">AI</span>
            </h1>
            <p className="mt-5 text-xl font-medium text-accent">
              From raw idea to investor ready in one session
            </p>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-muted">
              The complete founder workspace: market scan, risk audit, tailored interview,
              viability scoring, pitch deck, voiceover, and campaign assets. Enterprise polish.
              Startup speed.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/pitch">
                <Button size="lg">
                  <IconLaunch size={18} />
                  Start Pitch Mode
                </Button>
              </Link>
              <Link to="/campaign">
                <Button size="lg" variant="secondary">
                  <IconCampaign size={18} />
                  Campaign Mode
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <Card variant="elevated" className="animate-float border-accent/20">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                Live intelligence preview
              </p>
              <p className="mt-3 font-display text-lg font-semibold text-ink">
                AI tutoring platform for emerging markets
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { label: 'Viability', value: '84', tone: 'text-accent' },
                  { label: 'Market signal', value: 'Strong', tone: 'text-gold' },
                  { label: 'Risk profile', value: 'Managed', tone: 'text-ink' },
                  { label: 'Deck status', value: '12 slides', tone: 'text-violet' },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="rounded-xl bg-void/60 p-4 ring-1 ring-border"
                  >
                    <p className="text-xs text-ink-muted">{item.label}</p>
                    <p className={`mt-1 text-2xl font-bold font-display ${item.tone}`}>
                      {item.value}
                    </p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 h-2 overflow-hidden rounded-full bg-surface-3">
                <motion.div
                  className="h-full progress-shimmer rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '78%' }}
                  transition={{ delay: 0.6, duration: 1.2, ease: 'easeOut' }}
                />
              </div>
              <p className="mt-2 text-xs text-ink-muted">Package generation 78% complete</p>
            </Card>
            <motion.div
              className="absolute -right-4 -top-4 rounded-2xl glass-panel px-4 py-3 shadow-lg"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <p className="text-xs text-ink-muted">Voiceover</p>
              <p className="text-sm font-semibold text-accent">Ready</p>
            </motion.div>
          </motion.div>
        </div>

        <div className="border-t border-border/40 bg-surface/30 py-8">
          <Stagger className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-4 sm:grid-cols-4 sm:px-6">
            {stats.map((s) => (
              <StaggerItem key={s.label} className="text-center">
                <p className="font-display text-3xl font-bold text-gradient-accent">{s.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-ink-muted">{s.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-bold text-ink sm:text-4xl">
            Two paths. One platform.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-ink-muted">
            Whether you are validating a new venture or scaling an existing brand, LaunchPad AI delivers production quality outputs.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          <Reveal delay={0.1}>
            <Link to="/pitch" className="group block h-full">
              <Card className="h-full border-transparent transition duration-300 group-hover:border-accent/40 group-hover:shadow-[0_0_48px_-16px_rgba(0,229,192,0.35)]">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent ring-1 ring-accent/25">
                  <IconIdea size={28} />
                </div>
                <h3 className="font-display text-xl font-bold text-ink">I have an idea</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  Full validation pipeline: scan, audit, founder interview, viability score, and a complete pitch package with deck and audio.
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  Enter Pitch Mode
                  <IconPitch size={16} />
                </span>
              </Card>
            </Link>
          </Reveal>
          <Reveal delay={0.2}>
            <Link to="/campaign" className="group block h-full">
              <Card className="h-full border-transparent transition duration-300 group-hover:border-warm/40 group-hover:shadow-[0_0_48px_-16px_rgba(255,122,89,0.3)]">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-warm/10 text-warm ring-1 ring-warm/25">
                  <IconShield size={28} />
                </div>
                <h3 className="font-display text-xl font-bold text-ink">I have a business</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  Campaign copy, ad scripts, social captions, banners, and multimedia assets tuned to your brand voice.
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-warm">
                  Enter Campaign Mode
                  <IconCampaign size={16} />
                </span>
              </Card>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border/50 bg-surface/20 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-bold text-ink">
              Built for the screening room
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-ink-muted">
              Every interaction is designed to feel premium: animated progress, visual decks, and exports your judges can open immediately.
            </p>
          </Reveal>
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, desc }) => (
              <StaggerItem key={title}>
                <Card variant="muted" className="h-full hover:border-accent/20 transition-colors">
                  <Icon className="mb-4 text-accent" size={26} />
                  <h3 className="font-display font-semibold text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{desc}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6">
        <Reveal>
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Ready when you are
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            Join founders who ship investor ready materials in minutes, not weeks.
          </p>
          <Link to="/pitch" className="mt-8 inline-block">
            <Button size="lg">
              <IconLaunch size={18} />
              Launch your pitch now
            </Button>
          </Link>
        </Reveal>
      </section>
    </PageShell>
  )
}
