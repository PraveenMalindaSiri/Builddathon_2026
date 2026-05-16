import { zodResolver } from '@hookform/resolvers/zod'
import { Download, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import { ErrorState } from '@/components/common/ErrorState'
import { Input } from '@/components/common/Input'
import { Select } from '@/components/common/Select'
import { Textarea } from '@/components/common/Textarea'
import { SectionHeader } from '@/components/common/SectionHeader'
import { JobProgress } from '@/components/jobs/JobProgress'
import { JobStepper } from '@/components/jobs/JobStepper'
import { PageShell } from '@/components/layout/PageShell'
import { env } from '@/config/env'
import { useCampaignGeneration } from '@/hooks/useCampaignGeneration'
import { campaignFormSchema, type CampaignFormValues } from '@/lib/validators'
import type { CampaignRequest } from '@/services/campaignService'

const MAX_REFERENCE_MB = 5

export function CampaignPage() {
  const { generate, result, isLoading, error, job, downloadZip, campaignId } =
    useCampaignGeneration()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [referenceFile, setReferenceFile] = useState<File | null>(null)
  const [referencePreview, setReferencePreview] = useState<string | null>(null)

  useEffect(() => {
    if (!referenceFile) {
      setReferencePreview(null)
      return
    }
    const url = URL.createObjectURL(referenceFile)
    setReferencePreview(url)
    return () => URL.revokeObjectURL(url)
  }, [referenceFile])

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
    if (referenceFile && referenceFile.size > MAX_REFERENCE_MB * 1024 * 1024) {
      toast.error(`Reference image must be ${MAX_REFERENCE_MB} MB or smaller.`)
      return
    }
    const request: CampaignRequest = {
      description: data.businessDescription,
      productUrl: data.productUrl || undefined,
      tone: data.tone,
      platform: data.platform,
      referenceImage: referenceFile ?? undefined,
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
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Product / brand photo (optional, max 5 MB)
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="block w-full text-sm text-slate-400 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-800 file:px-4 file:py-2 file:text-sm file:text-slate-200"
                onChange={(e) => setReferenceFile(e.target.files?.[0] ?? null)}
              />
              {referencePreview && (
                <img
                  src={referencePreview}
                  alt="Reference preview"
                  className="mt-3 max-h-40 rounded-xl object-cover"
                />
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Select label="Tone" {...register('tone')}>
                <option value="energetic">Energetic</option>
                <option value="professional">Professional</option>
                <option value="emotional">Emotional</option>
                <option value="funny">Funny</option>
              </Select>
              <Select label="Platform (appended to description)" {...register('platform')}>
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
            {isLoading && (
              <div className="space-y-6 py-4">
                <JobProgress job={job} />
                <JobStepper job={job} />
              </div>
            )}
          </form>
        ) : (
          <div className="space-y-6">
            {campaignId && !env.useMockApi && (
              <Button variant="secondary" onClick={() => void downloadZip()}>
                <Download className="h-4 w-4" />
                Download campaign ZIP
              </Button>
            )}
            {result.referenceImageUrl && (
              <Card>
                <h3 className="font-semibold text-slate-100">Your reference upload</h3>
                <img
                  src={result.referenceImageUrl}
                  alt="Reference upload"
                  className="mt-3 max-h-48 rounded-xl object-cover w-full"
                />
              </Card>
            )}
            {result.bannerUrl && (
              <Card>
                <h3 className="font-semibold text-slate-100">Generated banner</h3>
                <img
                  src={result.bannerUrl}
                  alt="Campaign banner"
                  className="mt-3 rounded-xl max-h-64 object-cover w-full"
                />
              </Card>
            )}
            {result.audioUrl && (
              <Card>
                <h3 className="font-semibold text-slate-100">Campaign audio</h3>
                <audio controls className="mt-3 w-full" src={result.audioUrl} />
              </Card>
            )}
            {result.videoUrl && (
              <Card>
                <h3 className="font-semibold text-slate-100">Promo video</h3>
                <video controls className="mt-3 w-full rounded-xl" src={result.videoUrl} />
              </Card>
            )}
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
