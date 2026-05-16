import { clampScore } from '@/lib/formatters'
import type { BackendSession } from '@/types/backend'
import type { PitchJobResult } from '@/types/launchpad'
import type {
  ClarifyingQuestion,
  ConceptSummary,
  InvestorQA,
  MarketScan,
  MarketStatus,
  PitchDeckSlide,
  PitchSlideLayout,
  PitchGenerationResult,
  RiskItem,
  RiskSeverity,
  ViabilityScore,
  MarketingStarterPack,
} from '@/types/pitch'

function pick<T>(...values: (T | undefined | null)[]): T | undefined {
  return values.find((v) => v !== undefined && v !== null) as T | undefined
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>
  }
  return undefined
}

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : []
}

function mapConceptSummary(raw: Record<string, unknown> | undefined): ConceptSummary {
  if (!raw) {
    return {
      oneLineSummary: 'No summary available',
      summary: 'No summary available',
    }
  }
  return {
    nameSuggestion: pick(raw.nameSuggestion as string, raw.name_suggestion as string),
    oneLineSummary:
      pick(raw.oneLineSummary as string, raw.one_line_summary as string) || 'Your venture',
    summary: (raw.summary as string) || (raw.oneLineSummary as string) || '',
    targetCustomer: pick(raw.targetCustomer as string, raw.target_customer as string),
    problem: raw.problem as string | undefined,
    solution: raw.solution as string | undefined,
    businessModel: pick(raw.businessModel as string, raw.business_model as string),
  }
}

function mapMarketStatus(value: unknown): MarketStatus {
  const s = String(value ?? 'unknown').toLowerCase()
  if (s === 'green') return 'underserved'
  if (s === 'red') return 'saturated'
  if (s === 'amber') return 'crowded_but_possible'
  if (s.includes('saturated')) return 'saturated'
  if (s.includes('underserved') || s.includes('blue')) return 'underserved'
  if (s.includes('crowded') || s.includes('possible')) return 'crowded_but_possible'
  return 'unknown'
}

function mapMarketScan(raw: Record<string, unknown> | undefined): MarketScan {
  if (!raw) {
    return {
      status: 'unknown',
      summary: 'No market scan data returned.',
      competitors: [],
      opportunityGaps: [],
    }
  }
  const competitors = asArray<Record<string, unknown>>(raw.competitors).map((c) => ({
    name: (c.name as string) || 'Unknown',
    website: c.website as string | undefined,
    description: c.description as string | undefined,
    strength: c.strength as string | undefined,
    weakness: c.weakness as string | undefined,
  }))
  const rating = raw.opportunityRating ?? raw.opportunity_rating
  return {
    status: mapMarketStatus(pick(raw.status, rating)),
    summary: (raw.summary as string) || '',
    competitors,
    opportunityGaps: asArray<string>(
      raw.opportunityGaps ?? raw.opportunity_gaps ?? raw.uspGaps ?? raw.usp_gaps,
    ),
    suggestedPositioning: pick(
      raw.suggestedPositioning as string,
      raw.suggested_positioning as string,
    ),
    marketSizeEstimate: pick(
      raw.marketSizeEstimate as string,
      raw.market_size_estimate as string,
      raw.marketSize as string,
      raw.market_size as string,
    ),
    citations: asArray<string>(raw.citations),
  }
}

function mapSeverity(value: unknown): RiskSeverity {
  const s = String(value ?? 'medium').toLowerCase()
  if (s === 'high') return 'high'
  if (s === 'low') return 'low'
  return 'medium'
}

function mapRiskRegister(raw: unknown): RiskItem[] {
  let items: unknown = raw
  const wrapped = asRecord(raw)
  if (wrapped?.risks) {
    items = wrapped.risks
  }
  return asArray<Record<string, unknown>>(items).map((r) => ({
    category: (r.category as RiskItem['category']) || 'Other',
    severity: mapSeverity(r.severity),
    risk:
      (r.risk as string) ||
      (r.description as string) ||
      (r.title as string) ||
      'Risk',
    explanation: (r.explanation as string) || '',
    mitigation: r.mitigation as string | undefined,
  }))
}

function mapViability(raw: Record<string, unknown> | undefined): ViabilityScore {
  if (!raw) {
    return {
      overall: 0,
      marketOpportunity: 0,
      competitiveRisk: 0,
      legalComplexity: 0,
      differentiation: 0,
      summary: 'Viability score not available.',
    }
  }
  const breakdown = asRecord(raw.breakdown)
  return {
    overall: clampScore(pick(raw.overall as number, raw.overall_score as number)),
    marketOpportunity: clampScore(
      pick(
        raw.marketOpportunity as number,
        raw.market_opportunity as number,
        breakdown?.marketOpportunity as number,
      ),
    ),
    competitiveRisk: clampScore(
      pick(
        raw.competitiveRisk as number,
        raw.competitive_risk as number,
        breakdown?.competitiveRisk as number,
      ),
    ),
    legalComplexity: clampScore(
      pick(
        raw.legalComplexity as number,
        raw.legal_complexity as number,
        breakdown?.legalComplexity as number,
      ),
    ),
    differentiation: clampScore(
      pick(raw.differentiation as number, breakdown?.differentiation as number),
    ),
    founderFit: clampScore(pick(raw.founderFit as number, raw.founder_fit as number)),
    summary: (raw.summary as string) || '',
  }
}

const REFINE_QUESTION_CATEGORIES: ClarifyingQuestion['category'][] = [
  'Customer',
  'Revenue',
  'Moat',
  'Market Entry',
  'Founder Fit',
]

function mapRefineAnswers(raw: unknown): Array<{ question: string; answer: string }> {
  return asArray<unknown>(raw)
    .map((item) => {
      if (typeof item !== 'object' || item === null) return null
      const rec = item as Record<string, unknown>
      const question = (rec.question as string) || ''
      if (!question) return null
      return { question, answer: (rec.answer as string) || '' }
    })
    .filter((item): item is { question: string; answer: string } => item !== null)
}

function mapQuestions(questionsRaw: unknown, answersRaw?: unknown): ClarifyingQuestion[] {
  const answerItems = mapRefineAnswers(answersRaw)
  const answerByQuestion = new Map(answerItems.map((a) => [a.question, a.answer]))
  const questions = asArray<unknown>(questionsRaw)

  if (questions.length === 0 && answerItems.length > 0) {
    return answerItems.map((item, i) => ({
      category: REFINE_QUESTION_CATEGORIES[i] ?? 'Other',
      question: item.question,
      founderAnswer: item.answer || undefined,
    }))
  }

  const mapped: ClarifyingQuestion[] = []

  for (let i = 0; i < questions.length; i += 1) {
    const item = questions[i]

    if (typeof item === 'string') {
      const trimmed = item.trim()
      if (!trimmed) continue
      const founderAnswer =
        answerItems[i]?.answer ?? answerByQuestion.get(trimmed) ?? undefined
      mapped.push({
        category: REFINE_QUESTION_CATEGORIES[i] ?? 'Other',
        question: trimmed,
        founderAnswer: founderAnswer || undefined,
      })
      continue
    }

    if (typeof item !== 'object' || item === null) continue
    const q = item as Record<string, unknown>
    const questionText = ((q.question as string) || '').trim()
    if (!questionText) continue
    const founderAnswer = pick(
      q.answer as string,
      answerItems[i]?.answer,
      answerByQuestion.get(questionText),
    )

    mapped.push({
      category:
        (q.category as ClarifyingQuestion['category']) ||
        REFINE_QUESTION_CATEGORIES[i] ||
        'Other',
      question: questionText,
      whyItMatters: pick(q.whyItMatters as string, q.why_it_matters as string),
      suggestedAnswerDirection: pick(
        q.suggestedAnswerDirection as string,
        q.suggested_answer_direction as string,
      ),
      founderAnswer: founderAnswer || undefined,
    })
  }

  return mapped
}

function mapPitchDeck(raw: unknown): PitchDeckSlide[] {
  return asArray<Record<string, unknown>>(raw).map((s, i) => {
    const content = (s.content as string) || ''
    const subtitle = pick(s.subtitle as string)
    const bullets = asArray<string>(s.bullets)
    const mainMessage =
      pick(s.mainMessage as string, s.main_message as string) || subtitle || content
    return {
      slideNumber:
        (s.slideNumber as number) ?? (s.slide as number) ?? (s.slide_number as number) ?? i + 1,
      layout: (s.layout as PitchSlideLayout) || 'bullets',
      title: (s.title as string) || `Slide ${i + 1}`,
      subtitle,
      mainMessage,
      content: content || undefined,
      bullets: bullets.length > 0 ? bullets : content ? [content] : [],
      speakerNote: pick(
        s.speakerNotes as string,
        s.speaker_notes as string,
        s.speakerNote as string,
        s.speaker_note as string,
      ),
    }
  })
}

function mapSlideImageUrls(raw: unknown): Array<string | null> | undefined {
  if (!Array.isArray(raw)) return undefined
  return raw.map((u) => (typeof u === 'string' ? u : null))
}

function mapInvestorQA(raw: unknown): InvestorQA[] {
  return asArray<Record<string, unknown>>(raw).map((q) => ({
    question: (q.question as string) || '',
    whyInvestorAsks: pick(q.whyInvestorAsks as string, q.why_investor_asks as string),
    answerFramework:
      pick(
        q.answerFramework as string,
        q.answer_framework as string,
        q.framework as string,
      ) || '',
    category: q.category as InvestorQA['category'],
  }))
}

function mapMarketing(raw: Record<string, unknown> | undefined): MarketingStarterPack {
  if (!raw) {
    return { taglines: [], socialPosts: [] }
  }

  const heroCopyRaw = raw.heroCopy ?? raw.hero_copy
  let heroHeadline: string | undefined
  let heroSubheadline: string | undefined
  if (typeof heroCopyRaw === 'string') {
    heroHeadline = heroCopyRaw
  } else if (heroCopyRaw && typeof heroCopyRaw === 'object') {
    const h = heroCopyRaw as Record<string, string>
    heroHeadline = h.headline
    heroSubheadline = h.subheadline ?? h.sub_headline
  } else {
    heroHeadline = pick(raw.heroHeadline as string, raw.hero_headline as string)
    heroSubheadline = pick(raw.heroSubheadline as string, raw.hero_subheadline as string)
  }

  const socialRaw = raw.socialPosts ?? raw.social_posts
  let socialPosts: MarketingStarterPack['socialPosts'] = []
  if (socialRaw && typeof socialRaw === 'object' && !Array.isArray(socialRaw)) {
    socialPosts = Object.entries(socialRaw as Record<string, string>).map(
      ([platform, copy]) => ({
        platform: platform as MarketingStarterPack['socialPosts'][0]['platform'],
        copy,
      }),
    )
  } else {
    socialPosts = asArray<Record<string, unknown>>(socialRaw).map((p) => ({
      platform: (p.platform as MarketingStarterPack['socialPosts'][0]['platform']) || 'Other',
      copy: (p.copy as string) || '',
    }))
  }

  const coldRaw = raw.coldEmail ?? raw.cold_email
  let coldEmail: MarketingStarterPack['coldEmail'] | undefined
  if (typeof coldRaw === 'string') {
    coldEmail = { subject: 'Outreach', body: coldRaw }
  } else if (coldRaw && typeof coldRaw === 'object') {
    coldEmail = coldRaw as MarketingStarterPack['coldEmail']
  }

  return {
    taglines: asArray<string>(raw.taglines),
    heroHeadline,
    heroSubheadline,
    socialPosts,
    coldEmail,
    pressRelease: (raw.pressRelease as string) || (raw.press_release as string),
    seoKeywords: asArray<string>(raw.seoKeywords ?? raw.seo_keywords),
  }
}

export function mergePitchJobResult(
  base: PitchGenerationResult,
  jobResult?: PitchJobResult | null,
): PitchGenerationResult {
  if (!jobResult) return base

  const merged: PitchGenerationResult = { ...base }

  if (jobResult.pitchDeck?.length) {
    merged.pitchDeck = mapPitchDeck(jobResult.pitchDeck)
  }
  if (jobResult.investorQA?.length) {
    merged.investorQA = mapInvestorQA(jobResult.investorQA)
  }
  if (jobResult.marketingPack) {
    merged.marketingStarterPack = mapMarketing(
      jobResult.marketingPack as unknown as Record<string, unknown>,
    )
  }
  if (jobResult.audioUrl) {
    merged.audioUrl = jobResult.audioUrl
  }
  const pdfUrl = pick(
    jobResult.pdfUrl as string | undefined,
    jobResult.pptxUrl as string | undefined,
  )
  const pdfFilename = pick(
    jobResult.pdfFilename as string | undefined,
    jobResult.pptxFilename as string | undefined,
  )
  if (pdfUrl) merged.pdfUrl = pdfUrl
  if (pdfFilename) merged.pdfFilename = pdfFilename
  if (jobResult.slideImageUrls?.length) {
    merged.slideImageUrls = jobResult.slideImageUrls
  }
  merged.audioWarning = jobResult.audioWarning

  return merged
}

export function mapSessionToPitchResult(session: BackendSession): PitchGenerationResult {
  const sessionId = session.sessionId ?? session.id ?? ''
  const conceptRaw = asRecord(session.concept_summary ?? session.conceptSummary)
  const scanRaw = asRecord(session.scan_result ?? session.scanResult)
  const auditRaw = session.audit_result ?? session.auditResult
  const viabilityRaw = asRecord(session.viability_score ?? session.viabilityScore)
  const pitchOut = asRecord(session.pitch_output ?? session.pitchOutput)

  const pitchDeck = mapPitchDeck(
    pitchOut?.pitchDeck ?? pitchOut?.pitch_deck ?? pitchOut?.slides,
  )
  const investorQA = mapInvestorQA(
    pitchOut?.investorQA ?? pitchOut?.investor_qa ?? pitchOut?.investorQa,
  )
  const marketingStarterPack = mapMarketing(
    asRecord(pitchOut?.marketingPack ?? pitchOut?.marketing_pack ?? pitchOut?.marketingStarterPack),
  )

  return {
    sessionId,
    createdAt: session.createdAt ?? session.created_at,
    conceptSummary: mapConceptSummary(conceptRaw),
    clarifyingQuestions: mapQuestions(
      session.refine_questions ?? session.refineQuestions,
      session.refine_answers ?? session.refineAnswers,
    ),
    marketScan: mapMarketScan(scanRaw),
    riskRegister: mapRiskRegister(auditRaw),
    viabilityScore: mapViability(viabilityRaw),
    pitchDeck,
    investorQA,
    marketingStarterPack,
    audioUrl: session.audio_url ?? session.audioUrl,
    pdfUrl: pick(
      pitchOut?.pdfUrl as string,
      pitchOut?.pdf_url as string,
      pitchOut?.pptxUrl as string,
      pitchOut?.pptx_url as string,
    ),
    pdfFilename: pick(
      pitchOut?.pdfFilename as string,
      pitchOut?.pdf_filename as string,
      pitchOut?.pptxFilename as string,
      pitchOut?.pptx_filename as string,
    ),
    slideImageUrls: mapSlideImageUrls(
      pitchOut?.slideImageUrls ?? pitchOut?.slide_image_urls,
    ),
  }
}
