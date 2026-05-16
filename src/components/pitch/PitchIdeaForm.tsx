import { zodResolver } from '@hookform/resolvers/zod'
import { IconLaunch } from '@/components/icons/Icons'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { Select } from '@/components/common/Select'
import { Textarea } from '@/components/common/Textarea'
import { VoiceInputButton } from '@/components/pitch/VoiceInputButton'
import { COUNTRIES, EXAMPLE_IDEAS } from '@/config/constants'
import { loadStoredInput } from '@/hooks/usePitchGeneration'
import { pitchFormSchema, type PitchFormValues } from '@/lib/validators'
import type { PitchGenerateRequest } from '@/types/pitch'

type PitchIdeaFormProps = {
  onSubmit: (data: PitchGenerateRequest) => void
  isLoading?: boolean
}

const defaultValues: PitchFormValues = {
  idea: '',
  country: 'Sri Lanka',
  industry: '',
  founderContext: '',
  outputTone: 'investor-ready',
}

export function PitchIdeaForm({ onSubmit, isLoading }: PitchIdeaFormProps) {
  const stored = loadStoredInput()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PitchFormValues>({
    resolver: zodResolver(pitchFormSchema),
    defaultValues: stored
      ? {
          idea: stored.idea,
          country: stored.country,
          industry: stored.industry ?? '',
          founderContext: stored.founderContext ?? '',
          outputTone: stored.outputTone ?? 'investor-ready',
        }
      : defaultValues,
  })

  const idea = watch('idea')

  const appendTranscript = (text: string) => {
    const current = idea?.trim() ?? ''
    setValue('idea', current ? `${current} ${text}` : text, { shouldValidate: true })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Textarea
          label="Business idea"
          rows={6}
          placeholder="Example: I want to build an AI tutor for rural students in Sri Lanka that helps with local curriculum subjects..."
          error={errors.idea?.message}
          {...register('idea')}
        />
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <VoiceInputButton onTranscript={appendTranscript} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Target country / market" error={errors.country?.message} {...register('country')}>
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
        <Input
          label="Industry (optional)"
          placeholder="e.g. Education, Retail, Health"
          {...register('industry')}
        />
      </div>

      <Textarea
        label="Founder context (optional)"
        rows={3}
        placeholder="Your skills, resources, or target users..."
        {...register('founderContext')}
      />

      <Select label="Output tone" {...register('outputTone')}>
        <option value="investor-ready">Investor-ready</option>
        <option value="professional">Professional</option>
        <option value="friendly">Friendly</option>
      </Select>

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-muted">
          Example ideas
        </p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_IDEAS.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => setValue('idea', example, { shouldValidate: true })}
              className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-ink-soft transition hover:border-accent/50 hover:text-accent"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      <Button type="submit" size="lg" disabled={isLoading} className="w-full sm:w-auto">
        <IconLaunch size={18} />
        {isLoading ? 'Building your package…' : 'Generate Pitch Package'}
      </Button>
      <p className="text-xs text-ink-muted">
        Full pipeline typically completes in a few minutes.
      </p>
    </form>
  )
}
