import type { PitchGenerateRequest } from '@/types/pitch'

export function buildTranscript(form: PitchGenerateRequest): string {
  return [
    form.idea,
    form.country && `Country: ${form.country}`,
    form.industry && `Industry: ${form.industry}`,
    form.founderContext && `Founder context: ${form.founderContext}`,
    form.outputTone && `Output tone: ${form.outputTone}`,
  ]
    .filter(Boolean)
    .join('\n')
}
