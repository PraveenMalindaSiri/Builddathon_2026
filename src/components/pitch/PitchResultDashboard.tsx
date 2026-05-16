import { useState, type ReactNode } from 'react'
import { ConceptSummaryCard } from '@/components/pitch/ConceptSummaryCard'
import { ClarifyingQuestionsCard } from '@/components/pitch/ClarifyingQuestionsCard'
import { MarketScanCard } from '@/components/pitch/MarketScanCard'
import { RiskRegisterCard } from '@/components/pitch/RiskRegisterCard'
import { ViabilityScoreCard } from '@/components/pitch/ViabilityScoreCard'
import { PitchDeckCard } from '@/components/pitch/PitchDeckCard'
import { InvestorQACard } from '@/components/pitch/InvestorQACard'
import { MarketingPackCard } from '@/components/pitch/MarketingPackCard'
import { ExportActions } from '@/components/pitch/ExportActions'
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
    deck: <PitchDeckCard slides={result.pitchDeck} />,
    qa: <InvestorQACard items={result.investorQA} />,
    marketing: <MarketingPackCard data={result.marketingStarterPack} />,
  }

  const activeLabel = RESULT_SECTIONS.find((s) => s.id === section)?.label ?? 'Overview'

  return (
    <div>
      <ExportActions result={result} />
      <div className="flex flex-col gap-6 lg:flex-row">
        <nav
          className="lg:w-56 shrink-0"
          aria-label="Result sections"
        >
          <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {RESULT_SECTIONS.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => setSection(s.id)}
                  className={cn(
                    'whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition w-full text-left',
                    section === s.id
                      ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200',
                  )}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="min-w-0 flex-1">
          <SectionHeader title={activeLabel} />
          {content[section]}
        </div>
      </div>
      <ExportActions result={result} compact />
    </div>
  )
}
