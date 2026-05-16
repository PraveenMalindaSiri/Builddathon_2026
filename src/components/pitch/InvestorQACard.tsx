import { useState } from 'react'
import { IconChevronDown } from '@/components/icons/Icons'
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
    return <Card><p className="text-sm text-ink-muted">No investor Q&A returned.</p></Card>
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
              <span className="font-medium text-ink">{qa.question}</span>
              <IconChevronDown className={cn('mt-1 shrink-0 text-ink-muted transition', open && 'rotate-180')} size={16} />
            </button>
            {open && (
              <div className="border-t border-border px-4 pb-4 pt-3 space-y-3">
                {qa.category && <Badge tone="info">{qa.category}</Badge>}
                {qa.whyInvestorAsks && (
                  <p className="text-sm text-ink-muted">
                    <span className="text-ink-muted">Why investors ask: </span>
                    {qa.whyInvestorAsks}
                  </p>
                )}
                <p className="text-sm text-ink-soft">
                  <span className="font-medium text-ink-soft">Answer framework: </span>
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
