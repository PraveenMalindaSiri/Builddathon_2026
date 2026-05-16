export type JobStage = { key: string; label: string }

export type JobPollResponse = {
  jobId: string
  type?: 'pitch' | 'campaign'
  status: 'queued' | 'processing' | 'done' | 'failed'
  progress: string
  progressLabel?: string
  progressIndex?: number
  progressTotal?: number
  progressPercent?: number
  stages: JobStage[]
  result: PitchJobResult | CampaignJobResult | null
  error: string | null
}

export type PitchSlideLayout = 'title' | 'bullets' | 'metric' | 'chart' | 'competition'

export type PitchSlide = {
  slide: number
  layout?: PitchSlideLayout
  title: string
  subtitle?: string
  bullets?: string[]
  content?: string
  speakerNotes?: string
}

export type PitchJobResult = {
  pitchDeck?: PitchSlide[]
  investorQA?: Array<{ question: string; framework: string }>
  marketingPack?: {
    taglines?: string[]
    heroCopy?: string
    socialPosts?: Record<string, string>
    coldEmail?: string
    pressRelease?: string
    seoKeywords?: string[]
  }
  audioUrl?: string | null
  pptxUrl?: string | null
  pptxFilename?: string
  slideImageUrls?: Array<string | null>
  audioWarning?: string
}

export type RefineStepResponse = {
  questionIndex: number
  question?: string
  audioUrl?: string | null
  done: boolean
  category?: string
  whyItMatters?: string
}

export type CampaignJobResult = {
  campaignId?: string
  adScript?: string
  taglines?: string[]
  captions?: { instagram?: string; tiktok?: string; twitter?: string }
  emailCopy?: string
  heroCopy?: string
  bannerUrl?: string | null
  audioUrl?: string | null
  videoUrl?: string | null
  referenceImageUrl?: string | null
}

export type PptxExportResponse = {
  pptxUrl: string
  pptxFilename: string
}

export type BulkDeleteResponse = {
  ok: boolean
  deletedCount: number
  deletedIds: string[]
}
