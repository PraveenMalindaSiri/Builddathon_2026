import { zodResolver } from '@hookform/resolvers/zod'
import { Sparkles } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import { ErrorState } from '@/components/common/ErrorState'
import { Input } from '@/components/common/Input'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { Select } from '@/components/common/Select'
import { Textarea } from '@/components/common/Textarea'
import { SectionHeader } from '@/components/common/SectionHeader'
import { PageShell } from '@/components/layout/PageShell'
import { useCampaignGeneration } from '@/hooks/useCampaignGeneration'
import { campaignFormSchema, type CampaignFormValues } from '@/lib/validators'
import type { CampaignGenerateRequest } from '@/types/campaign'

export function CampaignPage() {
  const { generate, result, isLoading, error } = useCampaignGeneration()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      businessDescription: '',
      productUrl: '',
      tone: 'energetic',
      platform: 'Instagram',
    },
  })

  const onSubmit = (data: CampaignFormValues) => {
    const request: CampaignGenerateRequest = {
      businessDescription: data.businessDescription,
      productUrl: data.productUrl || undefined,
      tone: data.tone,
      platform: data.platform,
    }
    void generate(request)
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeader
          title="Campaign Mode"
          description="Generate taglines, ad copy, and social captions for your existing business."
        />

        {error && (
          <div className="mb-6">
            <ErrorState message={error} onRetry={() => window.location.reload()} />
          </div>
        )}

        {!result ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Textarea
              label="Business / product description"
              rows={5}
              placeholder="Describe your product, audience, and what makes it unique..."
              error={errors.businessDescription?.message}
              {...register('businessDescription')}
            />
            <Input
              label="Product URL (optional)"
              placeholder="https://yourstore.com"
              error={errors.productUrl?.message}
              {...register('productUrl')}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Select label="Tone" {...register('tone')}>
                <option value="energetic">Energetic</option>
                <option value="professional">Professional</option>
                <option value="emotional">Emotional</option>
                <option value="funny">Funny</option>
              </Select>
              <Select label="Platform" {...register('platform')}>
                <option value="Instagram">Instagram</option>
                <option value="TikTok">TikTok</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Email">Email</option>
                <option value="All">All</option>
              </Select>
            </div>
            <Button type="submit" size="lg" disabled={isLoading}>
              <Sparkles className="h-4 w-4" />
              {isLoading ? 'Generating...' : 'Generate Campaign'}
            </Button>
            {isLoading && <LoadingSpinner label="Creating your campaign package..." />}
          </form>
        ) : (
          <div className="space-y-6">
            <Card>
              <h3 className="font-semibold text-slate-100">Taglines</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {result.taglines.map((t) => (
                  <li key={t}>"{t}"</li>
                ))}
              </ul>
            </Card>
            <Card>
              <h3 className="font-semibold text-slate-100">Hero copy</h3>
              <p className="mt-2 text-lg font-medium text-slate-100">{result.heroCopy.headline}</p>
              <p className="text-sm text-slate-400">{result.heroCopy.subheadline}</p>
            </Card>
            <Card>
              <h3 className="font-semibold text-slate-100">Social captions</h3>
              <div className="mt-3 space-y-4">
                {result.socialCaptions.map((c) => (
                  <div key={c.platform}>
                    <p className="text-xs font-medium uppercase text-blue-400">{c.platform}</p>
                    <p className="mt-1 text-sm text-slate-300">{c.caption}</p>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <h3 className="font-semibold text-slate-100">Email</h3>
              <p className="mt-2 text-sm font-medium">{result.emailCopy.subject}</p>
              <pre className="mt-2 whitespace-pre-wrap text-sm text-slate-400">
                {result.emailCopy.body}
              </pre>
            </Card>
            <Card>
              <h3 className="font-semibold text-slate-100">Ad script ({result.adScript.duration})</h3>
              <pre className="mt-2 whitespace-pre-wrap text-sm text-slate-300">
                {result.adScript.script}
              </pre>
            </Card>
            <Button variant="secondary" onClick={() => window.location.reload()}>
              Generate another
            </Button>
          </div>
        )}
      </div>
    </PageShell>
  )
}
