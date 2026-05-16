import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { useActivePipeline } from '@/contexts/ActivePipelineContext'

const phaseLabels: Record<string, string> = {
  progress: 'Analyzing your idea',
  refine: 'Founder interview in progress',
  finishing: 'Building pitch package',
}

export function PipelineResumeBanner() {
  const location = useLocation()
  const { pitch, pitchActive, campaignActive } = useActivePipeline()

  const onPitch = location.pathname === '/pitch'
  const onCampaign = location.pathname === '/campaign'

  const showPitch = pitchActive && !onPitch
  const showCampaign = campaignActive && !onCampaign

  if (!showPitch && !showCampaign) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        className="fixed bottom-6 left-1/2 z-50 w-[min(100%,24rem)] -translate-x-1/2 px-4"
      >
        {showPitch && (
          <Link
            to="/pitch"
            className="glass-card flex items-center gap-3 border border-accent/30 px-4 py-3 shadow-lg transition hover:border-accent/50"
          >
            <Loader2 size={18} className="shrink-0 animate-spin text-accent" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-mono uppercase tracking-wider text-accent">Pitch running</p>
              <p className="truncate text-sm font-medium text-ink">
                {phaseLabels[pitch.phase] ?? 'Pipeline active'}
              </p>
            </div>
            <span className="shrink-0 text-xs font-semibold text-accent">Resume →</span>
          </Link>
        )}
        {showCampaign && !showPitch && (
          <Link
            to="/campaign"
            className="glass-card flex items-center gap-3 border border-violet/30 px-4 py-3 shadow-lg transition hover:border-violet/50"
          >
            <Loader2 size={18} className="shrink-0 animate-spin text-violet" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-mono uppercase tracking-wider text-violet">Campaign running</p>
              <p className="truncate text-sm font-medium text-ink">Generating your campaign</p>
            </div>
            <span className="shrink-0 text-xs font-semibold text-violet">Resume →</span>
          </Link>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
