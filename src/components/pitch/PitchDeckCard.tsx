import { PitchDeckViewer } from '@/components/pitch/PitchDeckViewer'
import type { PitchDeckSlide } from '@/types/pitch'

type PitchDeckCardProps = {
  slides: PitchDeckSlide[]
  slideImageUrls?: Array<string | null>
  citations?: string[]
}

export function PitchDeckCard({ slides, slideImageUrls, citations }: PitchDeckCardProps) {
  return (
    <PitchDeckViewer
      slides={slides}
      slideImageUrls={slideImageUrls}
      citations={citations}
    />
  )
}
