import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import { ParticleField } from '@/components/effects/ParticleField'
import {
  IconCampaign,
  IconChart,
  IconIdea,
  IconLaunch,
  IconMessage,
  IconMic,
  IconPitch,
  IconShield,
} from '@/components/icons/Icons'
import { PageShell } from '@/components/layout/PageShell'
import { MockPitchPreviewCard } from '@/components/pitch/MockPitchPreviewCard'
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal'

const features = [
  {
    icon: IconMic,
    title: 'Voice first capture',
    desc: 'Capture your vision by speaking or typing. Zero friction from thought to structured concept.',
    accent: '#38bdf8',
  },
  {
    icon: IconChart,
    title: 'Market intelligence',
    desc: 'Competitive landscape, opportunity signals, and positioning insights in one view.',
    accent: '#a78bfa',
  },
  {
    icon: IconPitch,
    title: 'Investor grade deck',
    desc: 'Layout aware slides with visuals, presenter mode, and export ready PDF.',
    accent: '#34d399',
  },
  {
    icon: IconMessage,
    title: 'Investor Q&A prep',
    desc: 'Anticipate tough questions with frameworks that help you answer with confidence.',
    accent: '#fbbf24',
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
      <section className="relative min-h-[90vh] overflow-hidden border-b border-border/50">
        <ParticleField />
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(56,189,248,0.12), transparent)',
          }}
        />
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" aria-hidden />

        <div className="relative z-10 mx-auto grid max-w-7xl items-start gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-x-20 lg:py-28 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 min-w-0 pr-0 lg:pr-6"
          >
            <div
              className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2"
              style={{
                borderColor: 'rgba(52,211,153,0.3)',
                background: 'rgba(52,211,153,0.06)',
                borderWidth: 1,
              }}
            >
              <span className="pulse-dot" />
              <span className="font-mono text-xs tracking-widest text-emerald-400 uppercase">
                Live — BuildATHON 2026
              </span>
            </div>
            <h1 className="font-display text-5xl leading-[1.05] font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block text-ink">Pitch</span>
              <span className="gradient-text">Smash</span>
            </h1>
            <p className="mt-5 text-xl font-grotesk text-ink-soft">
              Your AI co-founder.{' '}
              <TypeAnimation
                sequence={[
                  'From idea to launch.',
                  2800,
                  'From pitch to payday.',
                  2800,
                  'From dream to demo.',
                  2800,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-accent"
              />
            </p>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-muted">
              Market scan, risk audit, founder interview, viability scoring, pitch deck, voiceover,
              and campaign assets — mission control for founders.
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 flex flex-wrap gap-8 border-t border-border/40 pt-8"
            >
              {[
                { label: 'Pipeline steps', value: '7' },
                { label: 'AI models', value: '4' },
                { label: 'Output assets', value: '20+' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl font-bold text-accent">{stat.value}</div>
                  <div className="mt-0.5 font-mono text-xs text-ink-muted">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, type: 'spring', stiffness: 80 }}
            className="relative z-10 hidden w-full max-w-md justify-self-center lg:block lg:justify-self-end lg:pt-4"
          >
            <MockPitchPreviewCard />
          </motion.div>
        </div>

        <div className="relative z-10 border-t border-border/40 bg-surface/20 py-8">
          <Stagger className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-4 sm:grid-cols-4 sm:px-6">
            {stats.map((s) => (
              <StaggerItem key={s.label} className="text-center">
                <p className="font-display text-3xl font-bold gradient-text">{s.value}</p>
                <p className="mt-1 font-mono text-xs tracking-wider text-ink-muted uppercase">
                  {s.label}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-bold text-ink sm:text-4xl">
            Two paths. <span className="gradient-text">One platform.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-ink-muted">
            Whether you are validating a new venture or scaling an existing brand, PitchSmash
            delivers production quality outputs.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          <Reveal delay={0.1}>
            <Link to="/pitch" className="group block h-full">
              <Card className="glass-card h-full transition duration-300 group-hover:border-accent/40 group-hover:glow-cyan">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent ring-1 ring-accent/25">
                  <IconIdea size={28} />
                </div>
                <h3 className="font-display text-xl font-bold text-ink">I have an idea</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  Full validation pipeline: scan, audit, founder interview, viability score, and a
                  complete pitch package with deck and audio.
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
              <Card className="glass-card h-full transition duration-300 group-hover:border-violet/40">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet/10 text-violet ring-1 ring-violet/25">
                  <IconShield size={28} />
                </div>
                <h3 className="font-display text-xl font-bold text-ink">I have a business</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  Campaign copy, ad scripts, social captions, banners, and multimedia assets tuned to
                  your brand voice.
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-violet">
                  Enter Campaign Mode
                  <IconCampaign size={16} />
                </span>
              </Card>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-border/50 py-20" style={{ background: 'var(--bg-deep)' }}>
        <div className="section-divider mx-auto max-w-7xl" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="badge badge-violet mx-auto mb-4 w-fit">How it works</p>
            <h2 className="text-center font-display text-3xl font-bold text-ink sm:text-4xl">
              From raw idea to <span className="gradient-text">pitch ready</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-ink-muted">
              Every interaction feels like mission control — animated progress, visual decks, and
              exports your judges can open immediately.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, desc, accent }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card group cursor-default p-6"
              >
                <div
                  className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                  style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}
                >
                  <Icon size={18} style={{ color: accent }} />
                </div>
                <h3 className="font-display text-base font-bold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6">
        <Reveal>
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Ready when <span className="gradient-text">you are</span>
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
