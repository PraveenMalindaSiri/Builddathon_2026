import type { MarketStatus, RiskSeverity } from '@/types/pitch'

export function formatMarketStatus(status: MarketStatus): string {
  const labels: Record<MarketStatus, string> = {
    saturated: 'Saturated market',
    crowded_but_possible: 'Crowded but possible',
    underserved: 'Underserved opportunity',
    unknown: 'Market status unknown',
  }
  return labels[status] ?? status
}

export function formatSeverity(severity: RiskSeverity): string {
  return severity.charAt(0).toUpperCase() + severity.slice(1)
}

export function getViabilityLabel(score: number): string {
  if (score >= 80) return 'Very Strong'
  if (score >= 60) return 'Strong Potential'
  if (score >= 40) return 'Needs Work'
  return 'Weak'
}

export function clampScore(value: number | undefined): number {
  if (value === undefined || Number.isNaN(value)) return 0
  return Math.min(100, Math.max(0, Math.round(value)))
}
