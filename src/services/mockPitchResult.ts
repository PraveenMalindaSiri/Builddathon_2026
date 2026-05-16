import type { PitchGenerationResult } from '@/types/pitch'

export const mockPitchResult: PitchGenerationResult = {
  sessionId: 'pitch_demo_kamal',
  createdAt: new Date().toISOString(),
  conceptSummary: {
    nameSuggestion: 'RuralTutor AI',
    oneLineSummary:
      'An AI tutoring platform for rural students in Sri Lanka aligned with local curriculum.',
    summary:
      'The idea is to provide affordable AI-powered tutoring for secondary school students in rural Sri Lanka, with Sinhala/Tamil support, low-bandwidth access, and curriculum-aligned lessons.',
    targetCustomer: 'Rural secondary school students and parents',
    problem:
      'Students in rural areas have limited access to quality tutoring and exam preparation support.',
    solution:
      'A low-cost AI tutor that guides students through local syllabus topics with voice and text support.',
    businessModel: 'Freemium subscription with school partnerships',
  },
  clarifyingQuestions: [
    {
      category: 'Customer',
      question: 'Who is the first target user group?',
      whyItMatters: 'This helps narrow the MVP and go-to-market strategy.',
      suggestedAnswerDirection: 'Grade 10–11 O/L students in rural districts.',
    },
    {
      category: 'Revenue',
      question: 'How will you charge in the first 12 months?',
      whyItMatters: 'Investors want to see a realistic monetization path.',
    },
    {
      category: 'Moat',
      question: 'What stops a global edtech player from copying you in 6 months?',
      whyItMatters: 'Differentiation and defensibility matter for viability.',
    },
    {
      category: 'Operations',
      question: 'Can you deliver offline or low-bandwidth experiences?',
      whyItMatters: 'Rural connectivity constraints affect product design.',
    },
    {
      category: 'Market Entry',
      question: 'How will your first 100 students find you?',
      whyItMatters: 'Early distribution validates demand before scaling.',
    },
    {
      category: 'Founder Fit',
      question: 'Why are you the right person to build this?',
      whyItMatters: 'Founder-market fit is part of the viability score.',
    },
  ],
  marketScan: {
    status: 'crowded_but_possible',
    summary:
      'AI tutoring is competitive globally, but localised rural support with Sinhala/Tamil curriculum alignment is less served in Sri Lanka.',
    competitors: [
      {
        name: 'Global EdTech Platforms',
        description: 'Large online tutoring libraries',
        strength: 'Brand and content scale',
        weakness: 'Not optimised for rural Sri Lankan curriculum or bandwidth',
      },
      {
        name: 'Local Tuition Centers',
        description: 'In-person tutoring in urban areas',
        strength: 'Trusted relationships',
        weakness: 'Limited reach in rural districts, higher cost',
      },
      {
        name: 'YouTube Study Channels',
        description: 'Free video content',
        strength: 'Free and familiar',
        weakness: 'No guided learning path or progress tracking',
      },
    ],
    opportunityGaps: [
      'Sinhala/Tamil language support',
      'Low-bandwidth and offline-friendly modes',
      'Local O/L and A/L curriculum alignment',
      'Affordable pricing for rural households',
    ],
    suggestedPositioning:
      'Affordable localised AI tutor for underserved rural learners preparing for national exams.',
    marketSizeEstimate: 'Hundreds of thousands of rural secondary students in Sri Lanka',
  },
  riskRegister: [
    {
      category: 'Legal',
      severity: 'medium',
      risk: 'Student data privacy (minors)',
      explanation:
        'The platform may collect learning data from students under 18.',
      mitigation:
        'Collect minimal data, obtain parental consent where needed, and follow PDPA principles.',
    },
    {
      category: 'Operational',
      severity: 'medium',
      risk: 'Connectivity in rural areas',
      explanation: 'Unreliable internet may limit live AI sessions.',
      mitigation: 'Design offline-first lessons and async Q&A with sync when online.',
    },
    {
      category: 'Market',
      severity: 'low',
      risk: 'Willingness to pay',
      explanation: 'Rural households may prefer free alternatives.',
      mitigation: 'Freemium tier plus school or NGO partnerships for subsidised access.',
    },
  ],
  viabilityScore: {
    overall: 74,
    marketOpportunity: 78,
    competitiveRisk: 55,
    legalComplexity: 45,
    differentiation: 70,
    founderFit: 80,
    summary:
      'Strong potential if focused on local curriculum, low-bandwidth access, and a clear distribution path through schools.',
  },
  pitchDeck: [
    {
      slideNumber: 1,
      title: 'Hook',
      mainMessage: 'Rural students deserve equal access to quality learning support.',
      bullets: [
        'Tutoring access is uneven across Sri Lanka',
        'AI can reduce cost per student',
        'Localisation creates a real advantage',
      ],
      speakerNote: 'Open with the education access gap in rural districts.',
    },
    {
      slideNumber: 2,
      title: 'Problem',
      mainMessage: 'Rural students lack affordable, curriculum-aligned tutoring.',
      bullets: [
        'Limited access to qualified tutors',
        'High cost of urban tuition centers',
        'Generic global apps do not fit local exams',
      ],
    },
    {
      slideNumber: 3,
      title: 'Solution',
      mainMessage: 'RuralTutor AI — local curriculum AI tutoring that works on low bandwidth.',
      bullets: [
        'Sinhala/Tamil guided lessons',
        'O/L and A/L aligned content',
        'Freemium for students, B2B for schools',
      ],
    },
    {
      slideNumber: 4,
      title: 'Market Size',
      mainMessage: 'Large underserved segment in Sri Lankan secondary education.',
      bullets: ['TAM: National student population', 'SAM: Rural secondary students', 'SOM: First 3 districts pilot'],
    },
    {
      slideNumber: 5,
      title: 'Business Model',
      mainMessage: 'Freemium subscriptions plus institutional partnerships.',
      bullets: ['Student subscriptions', 'School/NGO licenses', 'Premium exam prep packs'],
    },
    {
      slideNumber: 6,
      title: 'Traction',
      mainMessage: 'Early validation through pilot conversations and MVP prototype.',
      bullets: ['Waitlist interest from teachers', 'MVP in development', 'Pilot school discussions'],
    },
    {
      slideNumber: 7,
      title: 'Competitive Landscape',
      mainMessage: 'Global players lack local depth; local tutors lack scale.',
      bullets: ['Position between free video and expensive tuition', 'Moat: curriculum + language + bandwidth'],
    },
    {
      slideNumber: 8,
      title: 'Go-To-Market',
      mainMessage: 'Start with 3 rural districts via school partnerships.',
      bullets: ['Teacher ambassadors', 'Parent WhatsApp groups', 'Exam-season campaigns'],
    },
    {
      slideNumber: 9,
      title: 'Team',
      mainMessage: 'Founder with software skills and local education network.',
      bullets: ['Technical MVP capability', 'Advisors from education sector', 'Hiring: curriculum lead'],
    },
    {
      slideNumber: 10,
      title: 'The Ask',
      mainMessage: 'Raising seed funding to launch pilot and prove retention.',
      bullets: ['Use of funds: product, content, pilot ops', '18-month milestones', 'Key metrics: MAU, conversion, retention'],
    },
  ],
  investorQA: [
    {
      category: 'Competition',
      question: 'Why will students use this instead of YouTube?',
      whyInvestorAsks: 'They want to understand differentiation.',
      answerFramework:
        'Explain curriculum alignment, guided learning paths, progress tracking, and local language support.',
    },
    {
      category: 'Business Model',
      question: 'Can rural families actually pay for a subscription?',
      whyInvestorAsks: 'Unit economics and affordability matter.',
      answerFramework:
        'Acknowledge price sensitivity, describe freemium tier, school subsidies, and willingness-to-pay from pilot data.',
    },
    {
      category: 'Legal',
      question: 'How do you handle data from minors?',
      whyInvestorAsks: 'Regulatory and reputational risk.',
      answerFramework:
        'Minimal data collection, parental consent flows, PDPA alignment, and security roadmap.',
    },
    {
      category: 'Scalability',
      question: 'What happens if OpenAI or a global player enters Sri Lanka?',
      whyInvestorAsks: 'Defensibility against well-funded competition.',
      answerFramework:
        'Lead with local curriculum, distribution through schools, and low-bandwidth product design.',
    },
  ],
  marketingStarterPack: {
    taglines: [
      'Smart tutoring for every student.',
      'Local learning, powered by AI.',
      'Affordable help beyond the classroom.',
    ],
    heroHeadline: 'AI tutoring built for Sri Lankan students',
    heroSubheadline:
      'Personalised learning support for students who need affordable, curriculum-aligned help.',
    socialPosts: [
      {
        platform: 'LinkedIn',
        copy: 'We are building an AI tutor to make quality learning more accessible for rural students in Sri Lanka. Follow our journey.',
      },
      {
        platform: 'Instagram',
        copy: 'Exam season is tough. RuralTutor AI brings guided lessons to your phone — even on low data.',
      },
    ],
    coldEmail: {
      subject: 'Helping rural students access better learning support',
      body: 'Hi [Name],\n\nWe are building RuralTutor AI — an affordable AI tutoring platform aligned with the local curriculum. We would love to explore a pilot with your school.\n\nBest,\n[Founder]',
    },
    pressRelease:
      'RuralTutor AI launches to bring affordable, curriculum-aligned AI tutoring to rural students across Sri Lanka.',
    seoKeywords: [
      'AI tutor Sri Lanka',
      'online tutoring Sri Lanka',
      'rural education technology',
      'O/L exam preparation',
    ],
  },
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
