export type PitchGenerateRequest = {
  idea: string
  country: string
  industry?: string
  founderContext?: string
  outputTone?: 'professional' | 'friendly' | 'investor-ready'
}

export type ConceptSummary = {
  nameSuggestion?: string
  oneLineSummary: string
  summary: string
  targetCustomer?: string
  problem?: string
  solution?: string
  businessModel?: string
}

export type ClarifyingQuestion = {
  category:
    | 'Customer'
    | 'Revenue'
    | 'Moat'
    | 'Operations'
    | 'Market Entry'
    | 'Founder Fit'
    | 'Other'
  question: string
  whyItMatters?: string
  suggestedAnswerDirection?: string
}

export type MarketStatus =
  | 'saturated'
  | 'crowded_but_possible'
  | 'underserved'
  | 'unknown'

export type Competitor = {
  name: string
  website?: string
  description?: string
  strength?: string
  weakness?: string
}

export type MarketScan = {
  status: MarketStatus
  summary: string
  competitors: Competitor[]
  opportunityGaps: string[]
  suggestedPositioning?: string
  marketSizeEstimate?: string
}

export type RiskSeverity = 'high' | 'medium' | 'low'

export type RiskCategory =
  | 'Legal'
  | 'Ethical'
  | 'Operational'
  | 'Technical'
  | 'Market'
  | 'Financial'
  | 'Other'

export type RiskItem = {
  category: RiskCategory
  severity: RiskSeverity
  risk: string
  explanation: string
  mitigation?: string
}

export type ViabilityScore = {
  overall: number
  marketOpportunity: number
  competitiveRisk: number
  legalComplexity: number
  differentiation: number
  founderFit?: number
  summary: string
}

export type PitchDeckSlide = {
  slideNumber: number
  title: string
  mainMessage: string
  bullets: string[]
  speakerNote?: string
}

export type InvestorQA = {
  question: string
  whyInvestorAsks?: string
  answerFramework: string
  category?:
    | 'Market'
    | 'Competition'
    | 'Business Model'
    | 'Team'
    | 'Legal'
    | 'Scalability'
    | 'Execution'
    | 'Other'
}

export type SocialPost = {
  platform: 'Instagram' | 'LinkedIn' | 'X' | 'TikTok' | 'Facebook' | 'Other'
  copy: string
}

export type ColdEmail = {
  subject: string
  body: string
}

export type MarketingStarterPack = {
  taglines: string[]
  heroHeadline?: string
  heroSubheadline?: string
  socialPosts: SocialPost[]
  coldEmail?: ColdEmail
  pressRelease?: string
  seoKeywords?: string[]
}

export type PitchGenerationResult = {
  sessionId?: string
  createdAt?: string
  audioUrl?: string
  pptxUrl?: string
  audioWarning?: string
  conceptSummary: ConceptSummary
  clarifyingQuestions: ClarifyingQuestion[]
  marketScan: MarketScan
  riskRegister: RiskItem[]
  viabilityScore: ViabilityScore
  pitchDeck: PitchDeckSlide[]
  investorQA: InvestorQA[]
  marketingStarterPack: MarketingStarterPack
}
