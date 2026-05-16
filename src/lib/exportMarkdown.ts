import type { PitchGenerationResult } from '@/types/pitch'

export function pitchResultToMarkdown(result: PitchGenerationResult): string {
  const lines: string[] = [
    '# PitchSmash — Pitch Package',
    '',
    `Generated: ${result.createdAt ?? new Date().toISOString()}`,
    '',
    '## Concept Summary',
    `**${result.conceptSummary.nameSuggestion ?? 'Your venture'}**`,
    '',
    result.conceptSummary.oneLineSummary,
    '',
    result.conceptSummary.summary,
    '',
  ]

  if (result.conceptSummary.targetCustomer) {
    lines.push(`- **Target customer:** ${result.conceptSummary.targetCustomer}`)
  }
  if (result.conceptSummary.businessModel) {
    lines.push(`- **Business model:** ${result.conceptSummary.businessModel}`)
  }

  lines.push('', '## Clarifying Questions', '')
  for (const q of result.clarifyingQuestions) {
    lines.push(`### ${q.category}`, q.question, '')
    if (q.founderAnswer) lines.push(`*Your answer:* ${q.founderAnswer}`, '')
    if (q.whyItMatters) lines.push(`*Why it matters:* ${q.whyItMatters}`, '')
  }

  lines.push('## Market Scan', '', result.marketScan.summary, '')
  lines.push('### Competitors', '')
  for (const c of result.marketScan.competitors) {
    lines.push(`- **${c.name}** — ${c.description ?? ''}`)
  }

  lines.push('', '## Risk Register', '')
  for (const r of result.riskRegister) {
    lines.push(
      `### [${r.severity.toUpperCase()}] ${r.risk}`,
      r.explanation,
      r.mitigation ? `*Mitigation:* ${r.mitigation}` : '',
      '',
    )
  }

  const v = result.viabilityScore
  lines.push(
    '## Viability Score',
    '',
    `**Overall: ${v.overall}/100** — ${v.summary}`,
    '',
    `- Market opportunity: ${v.marketOpportunity}/100`,
    `- Competitive risk: ${v.competitiveRisk}/100`,
    `- Legal complexity: ${v.legalComplexity}/100`,
    `- Differentiation: ${v.differentiation}/100`,
    '',
  )

  lines.push('## Pitch Deck', '')
  for (const slide of result.pitchDeck) {
    lines.push(
      `### Slide ${slide.slideNumber}: ${slide.title}`,
      slide.mainMessage,
      '',
      ...slide.bullets.map((b) => `- ${b}`),
      '',
    )
  }

  lines.push('## Investor Q&A', '')
  for (const qa of result.investorQA) {
    lines.push(`### ${qa.question}`, '', qa.answerFramework, '')
  }

  const m = result.marketingStarterPack
  lines.push('## Marketing Starter Pack', '', '### Taglines', ...m.taglines.map((t) => `- ${t}`), '')

  return lines.filter(Boolean).join('\n')
}

export function pitchDeckToMarkdown(result: PitchGenerationResult): string {
  return result.pitchDeck
    .map(
      (s) =>
        `## Slide ${s.slideNumber}: ${s.title}\n\n${s.mainMessage}\n\n${s.bullets.map((b) => `- ${b}`).join('\n')}`,
    )
    .join('\n\n')
}

export function downloadFile(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
