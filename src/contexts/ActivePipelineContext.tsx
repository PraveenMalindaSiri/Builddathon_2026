import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { STORAGE_KEYS } from '@/config/constants'
import {
  generateCampaign,
  type CampaignRequest,
} from '@/services/campaignService'
import {
  runCaptureAndAnalysis,
  completePipelineAfterRefine,
} from '@/services/pitchPipeline'
import type { JobPollResponse, RefineStepResponse } from '@/types/pitchsmash'
import type { CampaignGenerationResult } from '@/types/campaign'
import type { PitchGenerateRequest } from '@/types/pitch'
import type { ApiStatus } from '@/types/api'
export type PitchPhase = 'idle' | 'form' | 'progress' | 'refine' | 'finishing'

type PitchPipelineState = {
  phase: PitchPhase
  progressStep: number
  sessionId: string | null
  refineStep: RefineStepResponse | null
  job: JobPollResponse | null
  error: string | null
  isBusy: boolean
}

type CampaignPipelineState = {
  status: ApiStatus
  error: string | null
  job: JobPollResponse | null
  result: CampaignGenerationResult | null
  campaignId: string | null
}

const idlePitch: PitchPipelineState = {
  phase: 'idle',
  progressStep: 0,
  sessionId: null,
  refineStep: null,
  job: null,
  error: null,
  isBusy: false,
}

const idleCampaign: CampaignPipelineState = {
  status: 'idle',
  error: null,
  job: null,
  result: null,
  campaignId: null,
}

type ActivePipelineContextValue = {
  pitch: PitchPipelineState
  campaign: CampaignPipelineState
  pitchActive: boolean
  campaignActive: boolean
  submitPitch: (data: PitchGenerateRequest) => Promise<void>
  completePitchRefine: () => Promise<void>
  setPitchRefineStep: (step: RefineStepResponse) => void
  clearPitchError: () => void
  resetPitch: () => void
  generateCampaignJob: (request: CampaignRequest) => Promise<{
    result: CampaignGenerationResult
    campaignId?: string
  }>
  resetCampaign: () => void
}

const ActivePipelineContext = createContext<ActivePipelineContextValue | null>(null)

function isOnPitchRoute(path: string) {
  return path === '/pitch' || path.startsWith('/pitch/')
}

function isOnCampaignRoute(path: string) {
  return path === '/campaign' || path.startsWith('/campaign/')
}

export function ActivePipelineProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [pitch, setPitch] = useState<PitchPipelineState>(idlePitch)
  const [campaign, setCampaign] = useState<CampaignPipelineState>(idleCampaign)

  const pitchActive = pitch.phase !== 'idle'
  const campaignActive = campaign.status === 'loading'

  const clearPitchError = useCallback(() => {
    setPitch((p) => ({ ...p, error: null }))
  }, [])

  const resetPitch = useCallback(() => {
    setPitch(idlePitch)
  }, [])

  const resetCampaign = useCallback(() => {
    setCampaign(idleCampaign)
  }, [])

  const setPitchRefineStep = useCallback((step: RefineStepResponse) => {
    setPitch((p) => ({ ...p, refineStep: step }))
  }, [])

  const submitPitch = useCallback(
    async (data: PitchGenerateRequest) => {
      setPitch({
        ...idlePitch,
        phase: 'progress',
        isBusy: true,
      })
      try {
        localStorage.setItem(STORAGE_KEYS.lastPitchInput, JSON.stringify(data))
        const { sessionId: sid, refineStep: step } = await runCaptureAndAnalysis(data, (s) =>
          setPitch((p) => ({ ...p, progressStep: s })),
        )
        setPitch((p) => ({
          ...p,
          phase: 'refine',
          sessionId: sid,
          refineStep: step,
          isBusy: false,
        }))
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Pipeline failed'
        setPitch({
          ...idlePitch,
          phase: 'form',
          error: msg.includes('INVALID_STATE')
            ? 'Complete the founder interview before generating the pitch.'
            : msg,
        })
      }
    },
    [],
  )

  const completePitchRefine = useCallback(async () => {
    const sessionId = pitch.sessionId
    if (!sessionId) return

    setPitch((p) => ({
      ...p,
      phase: 'finishing',
      progressStep: 4,
      job: null,
      isBusy: true,
      error: null,
    }))

    try {
      const result = await completePipelineAfterRefine(
        sessionId,
        (step) => setPitch((p) => ({ ...p, progressStep: step })),
        (job) => setPitch((p) => ({ ...p, job })),
      )

      if (result.audioWarning && !result.audioUrl) {
        toast.warning('Pitch package ready. Voice audio was unavailable.', {
          description: result.audioWarning,
        })
      }

      setPitch(idlePitch)

      if (isOnPitchRoute(location.pathname)) {
        navigate(`/pitch/result/${sessionId}`, { state: { result } })
      } else {
        toast.success('Pitch package ready', {
          description: 'Your pitch finished while you were away.',
          action: {
            label: 'View results',
            onClick: () => navigate(`/pitch/result/${sessionId}`, { state: { result } }),
          },
        })
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to complete pitch'
      setPitch((p) => ({
        ...p,
        phase: 'refine',
        error: msg,
        isBusy: false,
      }))
    }
  }, [pitch.sessionId, navigate, location.pathname])

  const generateCampaignJob = useCallback(
    async (request: CampaignRequest) => {
      setCampaign({
        ...idleCampaign,
        status: 'loading',
      })
      try {
        localStorage.setItem(STORAGE_KEYS.lastCampaignInput, JSON.stringify(request))
        const { result: data, campaignId: cid, initialJob } = await generateCampaign(
          request,
          (job) => setCampaign((c) => ({ ...c, job })),
        )
        if (cid) localStorage.setItem(STORAGE_KEYS.campaignId, cid)
        localStorage.setItem(STORAGE_KEYS.lastCampaignResult, JSON.stringify(data))

        setCampaign({
          status: 'success',
          error: null,
          job: initialJob ?? null,
          result: data,
          campaignId: cid ?? null,
        })

        if (isOnCampaignRoute(location.pathname) && cid) {
          navigate(`/campaign/${cid}`, { state: { result: data } })
        } else if (cid) {
          toast.success('Campaign ready', {
            description: 'Your campaign finished while you were away.',
            action: {
              label: 'View campaign',
              onClick: () => navigate(`/campaign/${cid}`, { state: { result: data } }),
            },
          })
        }

        return { result: data, campaignId: cid ?? undefined }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Generation failed.'
        setCampaign({
          ...idleCampaign,
          status: 'error',
          error: message,
        })
        throw err
      }
    },
    [navigate, location.pathname],
  )

  const value = useMemo(
    () => ({
      pitch,
      campaign,
      pitchActive,
      campaignActive,
      submitPitch,
      completePitchRefine,
      setPitchRefineStep,
      clearPitchError,
      resetPitch,
      generateCampaignJob,
      resetCampaign,
    }),
    [
      pitch,
      campaign,
      pitchActive,
      campaignActive,
      submitPitch,
      completePitchRefine,
      setPitchRefineStep,
      clearPitchError,
      resetPitch,
      generateCampaignJob,
      resetCampaign,
    ],
  )

  return (
    <ActivePipelineContext.Provider value={value}>{children}</ActivePipelineContext.Provider>
  )
}

export function useActivePipeline() {
  const ctx = useContext(ActivePipelineContext)
  if (!ctx) throw new Error('useActivePipeline must be used within ActivePipelineProvider')
  return ctx
}
