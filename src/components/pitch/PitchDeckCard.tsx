import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Card } from '@/components/common/Card'
import { cn } from '@/lib/cn'
import type { PitchDeckSlide } from '@/types/pitch'

type PitchDeckCardProps = {
  slides: PitchDeckSlide[]
}

export function PitchDeckCard({ slides }: PitchDeckCardProps) {
  const [openIndex, setOpenIndex] = useState(0)

  if (!slides?.length) {
    return <Card><p className="text-sm text-slate-400">No pitch deck slides returned.</p></Card>
  }

  return (
    <div className="space-y-2">
      {slides.map((slide, index) => {
        const open = openIndex === index
        return (
          <Card key={slide.slideNumber} className="!p-0 overflow-hidden">
            <button
              type="button"
              className="flex w-full items-center justify-between p-4 text-left"
              onClick={() => setOpenIndex(open ? -1 : index)}
              aria-expanded={open}
            >
              <span className="font-medium text-slate-100">
                Slide {slide.slideNumber}: {slide.title}
              </span>
              <ChevronDown className={cn('h-4 w-4 text-slate-400 transition', open && 'rotate-180')} />
            </button>
            {open && (
              <div className="border-t border-slate-800 px-4 pb-4 pt-3">
                <p className="font-medium text-blue-300">{slide.mainMessage}</p>
                <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-300">
                  {(slide.bullets ?? []).map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                {slide.speakerNote && (
                  <p className="mt-3 text-xs italic text-slate-500">Speaker note: {slide.speakerNote}</p>
                )}
              </div>
            )}
          </Card>
        )
      })}
    </div>
  )
}
