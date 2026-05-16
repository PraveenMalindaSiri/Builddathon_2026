import { AnimatePresence, motion } from 'framer-motion'
import { Check, Circle, Loader2 } from 'lucide-react'
import { PITCH_PROGRESS_STEPS } from '@/config/constants'

type PitchProgressProps = { activeStep: number }

export function PitchProgress({ activeStep }: PitchProgressProps) {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-lg items-center justify-center px-4" aria-live="polite">
      <div className="glass-card w-full p-8">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2" style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)' }}>
            <Loader2 size={14} className="animate-spin text-accent" />
            <span className="font-mono text-xs tracking-widest text-accent uppercase">AI pipeline running</span>
          </div>
          <h2 className="font-display text-3xl font-bold text-ink">
            Building your <span className="gradient-text">pitch package</span>
          </h2>
          <p className="mt-2 font-mono text-sm text-ink-muted">Do not close this tab</p>
        </motion.div>
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-6 w-px" style={{ background: 'linear-gradient(180deg, rgba(56,189,248,0.3), rgba(167,139,250,0.3))' }} />
          <div className="space-y-3">
            {PITCH_PROGRESS_STEPS.map((step, index) => {
              const isComplete = index < activeStep
              const isActive = index === activeStep
              return (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="relative flex items-center gap-4 pl-3"
                >
                  <div className="relative z-10 shrink-0">
                    <AnimatePresence mode="wait">
                      {isComplete ? (
                        <motion.div key="complete" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex h-6 w-6 items-center justify-center rounded-full" style={{ background: 'rgba(52,211,153,0.2)', border: '1px solid #34d399' }}>
                          <Check size={12} className="text-emerald-400" />
                        </motion.div>
                      ) : isActive ? (
                        <motion.div key="active" className="flex h-6 w-6 items-center justify-center rounded-full" style={{ background: 'rgba(56,189,248,0.15)', border: '1px solid #38bdf8' }} animate={{ boxShadow: ['0 0 0px rgba(56,189,248,0.5)', '0 0 16px rgba(56,189,248,0.5)', '0 0 0px rgba(56,189,248,0.5)'] }} transition={{ duration: 1.5, repeat: Infinity }}>
                          <Loader2 size={12} className="animate-spin text-accent" />
                        </motion.div>
                      ) : (
                        <motion.div key="pending" className="flex h-6 w-6 items-center justify-center rounded-full" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
                          <Circle size={8} className="text-ink-muted" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className={`flex-1 rounded-xl px-4 py-3 transition-all duration-300 ${isActive ? 'border border-accent/20 bg-accent/5' : isComplete ? 'opacity-50' : 'opacity-25'}`}>
                    <div className={`text-sm font-medium ${isActive ? 'text-accent' : isComplete ? 'text-emerald-400' : 'text-ink-muted'}`}>
                      {step}
                      {isActive && <span className="ml-2 font-mono text-xs text-accent/60 animate-pulse">processing...</span>}
                    </div>
                  </div>
                  <div className={`font-mono text-xs tabular-nums ${isComplete ? 'text-emerald-600' : isActive ? 'text-accent' : 'text-ink-muted/50'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-10 text-center font-mono text-xs text-ink-muted">
          LaunchPad AI · BuildATHON 2026
        </motion.p>

      </div>
    </div>
  )
}