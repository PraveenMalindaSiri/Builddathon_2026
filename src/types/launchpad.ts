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
  pdfUrl?: string | null
  pdfFilename?: string
  /** @deprecated Backend V5 uses pdfUrl */
  pptxUrl?: string | null
  /** @deprecated Backend V5 uses pdfFilename */
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

export type PdfExportResponse = {
  pdfUrl: string
  pdfFilename: string
}

export type BulkDeleteResponse = {
  ok: boolean
  deletedCount: number
  deletedIds: string[]
}

export type SessionListItem = {
  id: string
  title: string
  stage?: string
  concept_summary?: {
    summary?: string
    productType?: string
    industry?: string
    oneLineSummary?: string
    one_line_summary?: string
  } | null
  viability_score?: { overall?: number }
  created_at: string
  updated_at: string
}

export type CampaignListItem = {
  id: string
  title: string
  description: string
  tone: 'energetic' | 'professional' | 'emotional' | 'funny' | string
  status: 'processing' | 'done' | 'failed' | string
  banner_url: string | null
  audio_url: string | null
  created_at: string
  updated_at: string
}

export type HistoryResponse = {
  pitches: SessionListItem[]
  campaigns: CampaignListItem[]
}

export type CampaignRecord = {
  id: string
  user_id?: string
  description: string
  tone: string
  status: string
  ad_script: string | null
  taglines: string[] | null
  captions: { instagram?: string; tiktok?: string; twitter?: string } | null
  email_copy: string | null
  hero_copy: string | null
  banner_url: string | null
  audio_url: string | null
  video_url: string | null
  product_url: string | null
  reference_image_url: string | null
  created_at: string
  updated_at: string
}
