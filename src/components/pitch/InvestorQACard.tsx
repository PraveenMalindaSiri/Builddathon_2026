import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Badge } from '@/components/common/Badge'
import { Card } from '@/components/common/Card'
import { cn } from '@/lib/cn'
import type { InvestorQA } from '@/types/pitch'

type InvestorQACardProps = {
  items: InvestorQA[]
}

export function InvestorQACard({ items }: InvestorQACardProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (!items?.length) {
    return <Card><p className="text-sm text-slate-400">No investor Q&A returned.</p></Card>
  }

  return (
    <div className="space-y-2">
      {items.map((qa, index) => {
        const open = openIndex === index
        return (
          <Card key={qa.question} className="!p-0 overflow-hidden">
            <button
              type="button"
              className="flex w-full items-start justify-between gap-4 p-4 text-left"
              onClick={() => setOpenIndex(open ? null : index)}
              aria-expanded={open}
            >
              <span className="font-medium text-slate-100">{qa.question}</span>
              <ChevronDown className={cn('mt-1 h-4 w-4 shrink-0 text-slate-400 transition', open && 'rotate-180')} />
            </button>
            {open && (
              <div className="border-t border-slate-800 px-4 pb-4 pt-3 space-y-3">
                {qa.category && <Badge tone="info">{qa.category}</Badge>}
                {qa.whyInvestorAsks && (
                  <p className="text-sm text-slate-400">
                    <span className="text-slate-500">Why investors ask: </span>
                    {qa.whyInvestorAsks}
                  </p>
                )}
                <p className="text-sm text-slate-300">
                  <span className="font-medium text-slate-200">Answer framework: </span>
                  {qa.answerFramework}
                </p>
              </div>
            )}
          </Card>
        )
      })}
    </div>
  )
}
