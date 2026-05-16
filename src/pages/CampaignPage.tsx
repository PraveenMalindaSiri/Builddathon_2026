import { zodResolver } from '@hookform/resolvers/zod'
import { IconLaunch } from '@/components/icons/Icons'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/common/Button'
import { ErrorState } from '@/components/common/ErrorState'
import { Input } from '@/components/common/Input'
import { Select } from '@/components/common/Select'
import { Textarea } from '@/components/common/Textarea'
import { SectionHeader } from '@/components/common/SectionHeader'
import { JobProgress } from '@/components/jobs/JobProgress'
import { JobStepper } from '@/components/jobs/JobStepper'
import { PageShell } from '@/components/layout/PageShell'
import { useCampaignGeneration } from '@/hooks/useCampaignGeneration'
import { campaignFormSchema, type CampaignFormValues } from '@/lib/validators'
import type { CampaignRequest } from '@/services/campaignService'

const MAX_REFERENCE_MB = 5

export function CampaignPage() {
  const navigate = useNavigate()
  const { generate, isLoading, error, job } = useCampaignGeneration()
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

  const onSubmit = async (data: CampaignFormValues) => {
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
    try {
      const { result, campaignId } = await generate(request)
      if (campaignId) {
        navigate(`/campaign/${campaignId}`, { state: { result } })
      }
    } catch {
      /* error state handled in hook */
    }
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeader
          title="Campaign Mode"
          description="Generate taglines, ad copy, banners, and social captions for your business."
        />

        {error && (
          <div className="mb-6">
            <ErrorState message={error} onRetry={() => window.location.reload()} />
          </div>
        )}

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
            <label className="mb-2 block text-sm font-medium text-ink-soft">
              Product / brand photo (optional, max 5 MB)
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="block w-full text-sm text-ink-muted file:mr-4 file:rounded-lg file:border-0 file:bg-surface-2 file:px-4 file:py-2 file:text-sm file:text-ink-soft"
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
            <IconLaunch size={18} />
            {isLoading ? 'Generating...' : 'Generate Campaign'}
          </Button>
          {isLoading && (
            <div className="space-y-6 py-4">
              <JobProgress job={job} />
              <JobStepper job={job} />
            </div>
          )}
        </form>
      </div>
    </PageShell>
  )
}
