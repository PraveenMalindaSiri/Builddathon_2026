export type AuthUser = {
  id: string
  email: string
  tier?: string
  pitch_count?: number
  campaign_count?: number
}

export type SignInResponse = {
  user: AuthUser
  access_token: string
  refresh_token?: string
  expires_in?: number
}

export type JobStatus = 'queued' | 'processing' | 'completed' | 'failed'

export type JobResponse = {
  jobId: string
  type?: string
  status: JobStatus
  progress?: string
  result?: Record<string, unknown>
  error?: string | null
}

export type PitchJobResponse = {
  jobId: string
  status: string
}

export type CampaignStartResponse = {
  jobId: string
  campaignId: string
  status: string
  progress?: string
  referenceImageUrl?: string | null
  stages?: Array<{ key: string; label: string }>
}

export type CaptureResponse = {
  sessionId: string
  conceptSummary?: Record<string, unknown>
  disclaimer?: string
}

export type RefineStartResponse = {
  questions: Array<{
    category?: string
    question: string
    whyItMatters?: string
  }>
}

export type BackendSession = {
  id?: string
  sessionId?: string
  created_at?: string
  createdAt?: string
  concept_summary?: Record<string, unknown>
  conceptSummary?: Record<string, unknown>
  refine_questions?: unknown[]
  refineQuestions?: unknown[]
  scan_result?: Record<string, unknown>
  scanResult?: Record<string, unknown>
  audit_result?: unknown
  auditResult?: unknown
  viability_score?: Record<string, unknown>
  viabilityScore?: Record<string, unknown>
  pitch_output?: Record<string, unknown>
  pitchOutput?: Record<string, unknown>
  audio_url?: string
  audioUrl?: string
  idea_profile?: Record<string, unknown>
}

export type SessionListResponse = {
  sessions: Array<{
    id: string
    created_at?: string
    concept_summary?: { oneLineSummary?: string; one_line_summary?: string }
    viability_score?: { overall?: number }
  }>
}

export type HealthResponse = {
  status: string
  environment?: string
  mockAi?: boolean
  supabase?: boolean
  minimax?: boolean
  tavily?: boolean
}
