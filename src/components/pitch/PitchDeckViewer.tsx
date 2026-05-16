import { useCallback, useEffect, useState } from 'react'
import {
  IconChevronLeft,
  IconChevronRight,
  IconCollapse,
  IconExpand,
} from '@/components/icons/Icons'
import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import { cn } from '@/lib/cn'
import type { PitchDeckSlide } from '@/types/pitch'

type PitchDeckViewerProps = {
  slides: PitchDeckSlide[]
  slideImageUrls?: Array<string | null>
  citations?: string[]
}

function SlideContent({ slide }: { slide: PitchDeckSlide }) {
  const layout = slide.layout ?? 'bullets'

  if (layout === 'title') {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">{slide.title}</h2>
        {(slide.subtitle || slide.mainMessage) && (
          <p className="max-w-xl text-lg text-white/80">{slide.subtitle || slide.mainMessage}</p>
        )}
      </div>
    )
  }

  if (layout === 'metric') {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
        <p className="text-sm uppercase tracking-wide text-white/70">{slide.title}</p>
        <p className="text-4xl font-bold text-white sm:text-5xl">
          {slide.subtitle || slide.content || slide.mainMessage}
        </p>
        {slide.bullets.length > 0 && (
          <p className="text-sm text-white/70">{slide.bullets[0]}</p>
        )}
      </div>
    )
  }

  if (layout === 'chart' || layout === 'competition') {
    return (
      <div className="flex h-full flex-col justify-center gap-4">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">{slide.title}</h2>
        {slide.subtitle && <p className="text-lg italic text-white/80">{slide.subtitle}</p>}
        {slide.bullets.length > 0 ? (
          <ul className="mt-2 list-disc space-y-2 pl-6 text-base text-white/90 sm:text-lg">
            {slide.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        ) : (
          <p className="text-base text-white/90 sm:text-lg">{slide.content || slide.mainMessage}</p>
        )}
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col justify-center gap-4">
      <h2 className="text-2xl font-bold text-white sm:text-3xl">{slide.title}</h2>
      {slide.subtitle && <p className="text-lg italic text-white/80">{slide.subtitle}</p>}
      {slide.bullets.length > 0 ? (
        <ul className="mt-2 list-disc space-y-2 pl-6 text-base text-white/90 sm:text-lg">
          {slide.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      ) : (
        <p className="text-base text-white/90 sm:text-lg">{slide.content || slide.mainMessage}</p>
      )}
    </div>
  )
}

export function PitchDeckViewer({ slides, slideImageUrls, citations }: PitchDeckViewerProps) {
  const [index, setIndex] = useState(0)
  const [presenter, setPresenter] = useState(false)

  const total = slides.length
  const slide = slides[index]
  const image = slideImageUrls?.[index] ?? null

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => Math.max(0, Math.min(total - 1, i + delta)))
    },
    [total],
  )

  useEffect(() => {
    if (!presenter) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        go(1)
      }
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'Escape') setPresenter(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [presenter, go])

  if (!total || !slide) {
    return <Card><p className="text-sm text-ink-muted">No pitch deck slides returned.</p></Card>
  }

  const frame = (
    <div
      className={cn(
        'relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-surface-2 to-void ring-1 ring-border',
        presenter && 'rounded-none',
      )}
    >
      {image && (
        <>
          <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/45" />
        </>
      )}
      <div className="relative z-10 h-full p-6 sm:p-10">
        <SlideContent slide={slide} />
      </div>
    </div>
  )

  const controls = (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={index === 0}
          onClick={() => go(-1)}
          aria-label="Previous slide"
        >
          <IconChevronLeft size={16} />
        </Button>
        <span className="text-sm text-ink-muted">
          Slide {slide.slideNumber} of {total}
        </span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={index >= total - 1}
          onClick={() => go(1)}
          aria-label="Next slide"
        >
          <IconChevronRight size={16} />
        </Button>
      </div>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={() => setPresenter((p) => !p)}
      >
        {presenter ? (
          <>
            <IconCollapse size={16} />
            Exit presenter
          </>
        ) : (
          <>
            <IconExpand size={16} />
            Presenter mode
          </>
        )}
      </Button>
    </div>
  )

  if (presenter) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-void">
        <div className="flex flex-1 flex-col p-4 sm:p-8">
          {frame}
          {slide.speakerNote && (
            <div className="mt-4 rounded-xl border border-border bg-surface/90 p-4">
              <p className="text-xs font-medium uppercase text-accent">Speaker notes</p>
              <p className="mt-2 text-sm text-ink-soft">{slide.speakerNote}</p>
            </div>
          )}
        </div>
        <div className="border-t border-border bg-surface p-4">{controls}</div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {frame}
      {controls}
      {slide.speakerNote && (
        <p className="text-xs italic text-ink-muted">
          Speaker note: {slide.speakerNote}
        </p>
      )}
      {citations && citations.length > 0 && (
        <Card>
          <h4 className="text-sm font-semibold text-ink-soft">Sources & citations</h4>
          <ul className="mt-2 space-y-1 text-xs text-ink-muted">
            {citations.map((url) => (
              <li key={url}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline break-all"
                >
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  )
}
