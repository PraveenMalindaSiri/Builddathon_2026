import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ErrorState } from '@/components/common/ErrorState'
import { SectionHeader } from '@/components/common/SectionHeader'
import { PageShell } from '@/components/layout/PageShell'
import { PitchIdeaForm } from '@/components/pitch/PitchIdeaForm'
import { PitchProgress } from '@/components/pitch/PitchProgress'
import { PITCH_PROGRESS_STEPS } from '@/config/constants'
import { usePitchGeneration } from '@/hooks/usePitchGeneration'
import type { PitchGenerateRequest } from '@/types/pitch'

export function PitchPage() {
  const navigate = useNavigate()
  const { generate, isLoading, error } = usePitchGeneration()
  const [progressStep, setProgressStep] = useState(0)

  useEffect(() => {
    if (!isLoading) {
      setProgressStep(0)
      return
    }

    setProgressStep(0)
    const interval = setInterval(() => {
      setProgressStep((s) => Math.min(s + 1, PITCH_PROGRESS_STEPS.length - 1))
    }, 400)

    return () => clearInterval(interval)
  }, [isLoading])

  const handleSubmit = async (data: PitchGenerateRequest) => {
    try {
      const result = await generate(data)
      navigate('/pitch/result', { state: { result } })
    } catch {
      // error surfaced via hook
    }
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeader
          title="Pitch Mode"
          description="Describe your business idea. We'll generate a founder-ready pitch package."
        />

        {isLoading ? (
          <div className="py-8">
            <PitchProgress activeStep={progressStep} />
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-6">
                <ErrorState message={error} />
              </div>
            )}
            <PitchIdeaForm onSubmit={handleSubmit} isLoading={isLoading} />
          </>
        )}
      </div>
    </PageShell>
  )
}
