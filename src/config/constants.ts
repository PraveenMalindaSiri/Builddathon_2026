export const STORAGE_KEYS = {
  token: 'pitchsmash_token',
  sessionId: 'pitchsmash_sessionId',
  jobId: 'pitchsmash_jobId',
  lastPitchInput: 'pitchsmash:lastPitchInput',
  lastPitchResult: 'pitchsmash:lastPitchResult',
  lastCampaignInput: 'pitchsmash:lastCampaignInput',
  lastCampaignResult: 'pitchsmash:lastCampaignResult',
  campaignId: 'pitchsmash_campaignId',
} as const

export const EXAMPLE_IDEAS = [
  'AI tutor for rural students in Sri Lanka',
  'Subscription box for pet owners with locally sourced treats',
  'Marketplace for local handmade products',
  'Smart booking system for small salons',
] as const

export const COUNTRIES = [
  'Sri Lanka',
  'India',
  'United States',
  'United Kingdom',
  'Singapore',
  'Australia',
  'Other',
] as const

/** Matches live backend pipeline steps */
export const PITCH_PROGRESS_STEPS = [
  'Capturing idea',
  'Scanning market',
  'Auditing risks',
  'Founder interview',
  'Scoring viability',
  'Building pitch package',
  'Finalizing deck',
] as const

export const RESULT_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'questions', label: 'Questions' },
  { id: 'market', label: 'Market' },
  { id: 'risks', label: 'Risks' },
  { id: 'viability', label: 'Viability' },
  { id: 'deck', label: 'Pitch Deck' },
  { id: 'qa', label: 'Investor Q&A' },
  { id: 'marketing', label: 'Marketing' },
] as const

export type ResultSectionId = (typeof RESULT_SECTIONS)[number]['id']
