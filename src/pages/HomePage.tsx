import { Link } from 'react-router-dom'
import {
  BarChart3,
  Lightbulb,
  MessageSquare,
  Mic,
  Rocket,
  ShieldAlert,
} from 'lucide-react'
import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import { PageShell } from '@/components/layout/PageShell'

const features = [
  { icon: Mic, title: 'Voice-first capture', desc: 'Speak or type your raw idea with minimal friction.' },
  { icon: BarChart3, title: 'Market and risk scan', desc: 'Surface-level competitive and regulatory flags.' },
  { icon: Lightbulb, title: 'Pitch deck narrative', desc: 'Investor-style slide-by-slide story.' },
  { icon: MessageSquare, title: 'Investor Q&A coaching', desc: 'Tough questions with answer frameworks.' },
]

export function HomePage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-violet-600/5 to-transparent" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24 lg:px-8">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-300">
              <Rocket className="h-3.5 w-3.5" />
              BuildATHON 2026 · MiniMax track
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              LaunchPad AI
            </h1>
            <p className="mt-4 text-xl text-blue-200/90">
              Your AI Co-Founder. From Idea to Launch.
            </p>
            <p className="mt-4 max-w-lg text-slate-400">
              Turn a rough business idea into a refined investor pitch package — market scan, risk
              register, viability score, and founder-ready outputs in one session.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/pitch">
                <Button size="lg">Start Pitch Mode</Button>
              </Link>
              <Link to="/campaign">
                <Button size="lg" variant="secondary">
                  Try Campaign Mode
                </Button>
              </Link>
            </div>
          </div>

          <Card variant="elevated" className="border-blue-500/20">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Demo preview</p>
            <p className="mt-2 text-sm text-slate-300">
              Idea: <span className="text-slate-100">AI tutor for rural students</span>
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-slate-950 p-3">
                <p className="text-slate-500">Viability</p>
                <p className="text-2xl font-bold text-emerald-400">74/100</p>
              </div>
              <div className="rounded-xl bg-slate-950 p-3">
                <p className="text-slate-500">Market</p>
                <p className="font-medium text-amber-400">Crowded but possible</p>
              </div>
              <div className="rounded-xl bg-slate-950 p-3">
                <p className="text-slate-500">Risk</p>
                <p className="font-medium text-slate-200">Medium</p>
              </div>
              <div className="rounded-xl bg-slate-950 p-3">
                <p className="text-slate-500">Pitch deck</p>
                <p className="font-medium text-blue-400">10 slides ready</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-semibold text-slate-100">Two founders, one platform</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Link to="/pitch">
            <Card className="h-full transition hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-900/10">
              <Lightbulb className="mb-3 h-8 w-8 text-blue-400" />
              <h3 className="text-lg font-semibold text-slate-100">I have an idea</h3>
              <p className="mt-2 text-sm text-slate-400">
                Validate, refine, and turn your idea into an investor-ready pitch.
              </p>
            </Card>
          </Link>
          <Link to="/campaign">
            <Card className="h-full transition hover:border-violet-500/40">
              <ShieldAlert className="mb-3 h-8 w-8 text-violet-400" />
              <h3 className="text-lg font-semibold text-slate-100">I have a business</h3>
              <p className="mt-2 text-sm text-slate-400">
                Generate campaign copy, ad scripts, captions, and launch material.
              </p>
            </Card>
          </Link>
        </div>
      </section>

      <section className="border-t border-slate-800 bg-slate-900/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold text-slate-100">Built for founders</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, desc }) => (
              <Card key={title} variant="muted">
                <Icon className="mb-3 h-6 w-6 text-blue-400" />
                <h3 className="font-semibold text-slate-100">{title}</h3>
                <p className="mt-2 text-sm text-slate-400">{desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <p className="text-sm leading-relaxed text-slate-400">
          Meet Kamal. He has an idea for an AI tutor for rural students in Sri Lanka. He speaks his
          idea, LaunchPad AI refines it, scans risks, and generates a full pitch package — ready for
          investors.
        </p>
        <Link to="/pitch" className="mt-6 inline-block">
          <Button>Try the demo flow</Button>
        </Link>
      </section>
    </PageShell>
  )
}
