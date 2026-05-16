import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ConceptSummaryCard } from '@/components/pitch/ConceptSummaryCard'
import { ClarifyingQuestionsCard } from '@/components/pitch/ClarifyingQuestionsCard'
import { MarketScanCard } from '@/components/pitch/MarketScanCard'
import { RiskRegisterCard } from '@/components/pitch/RiskRegisterCard'
import { ViabilityScoreCard } from '@/components/pitch/ViabilityScoreCard'
import { PitchDeckCard } from '@/components/pitch/PitchDeckCard'
import { InvestorQACard } from '@/components/pitch/InvestorQACard'
import { MarketingPackCard } from '@/components/pitch/MarketingPackCard'
import { SectionHeader } from '@/components/common/SectionHeader'
import { RESULT_SECTIONS, type ResultSectionId } from '@/config/constants'
import { cn } from '@/lib/cn'
import type { PitchGenerationResult } from '@/types/pitch'

type PitchResultDashboardProps = {
  result: PitchGenerationResult
}

export function PitchResultDashboard({ result }: PitchResultDashboardProps) {
  const [section, setSection] = useState<ResultSectionId>('overview')

  const content: Record<ResultSectionId, ReactNode> = {
    overview: <ConceptSummaryCard data={result.conceptSummary} />,
    questions: <ClarifyingQuestionsCard questions={result.clarifyingQuestions} />,
    market: <MarketScanCard data={result.marketScan} />,
    risks: <RiskRegisterCard risks={result.riskRegister} />,
    viability: <ViabilityScoreCard data={result.viabilityScore} />,
    deck: (
      <PitchDeckCard
        slides={result.pitchDeck}
        slideImageUrls={result.slideImageUrls}
        citations={result.marketScan.citations}
      />
    ),
    qa: <InvestorQACard items={result.investorQA} />,
    marketing: <MarketingPackCard data={result.marketingStarterPack} />,
  }

  const activeLabel = RESULT_SECTIONS.find((s) => s.id === section)?.label ?? 'Overview'

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <nav className="lg:w-60 shrink-0" aria-label="Result sections">
        <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0 lg:space-y-1">
          {RESULT_SECTIONS.map((s) => (
            <li key={s.id} className="relative">
              <button
                type="button"
                onClick={() => setSection(s.id)}
                className={cn(
                  'relative z-10 w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium whitespace-nowrap transition-colors duration-200',
                  section === s.id ? 'text-accent' : 'text-ink-muted hover:text-ink',
                )}
              >
                {s.label}
              </button>
              {section === s.id && (
                <motion.div
                  layoutId="active-section"
                  className="absolute inset-0 rounded-xl border border-accent/20 bg-accent/8"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                />
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="min-w-0 flex-1">
        <SectionHeader title={activeLabel} />
        <div key={section}>{content[section]}</div>
      </div>
    </div>
  )
}
