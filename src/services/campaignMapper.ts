import type { CampaignGenerationResult } from '@/types/campaign'
import type { CampaignJobResult, CampaignRecord } from '@/types/launchpad'

export function mapJobResultToCampaign(result: CampaignJobResult): CampaignGenerationResult {
  const heroRaw = result.heroCopy
  let headline = 'Campaign headline'
  let subheadline = ''
  if (typeof heroRaw === 'string') {
    headline = heroRaw
  } else if (heroRaw && typeof heroRaw === 'object') {
    const h = heroRaw as Record<string, string>
    headline = h.headline || headline
    subheadline = h.subheadline || h.sub_headline || ''
  }

  const captions = result.captions ?? {}
  const socialCaptions: CampaignGenerationResult['socialCaptions'] = []
  if (captions.instagram) socialCaptions.push({ platform: 'Instagram', caption: captions.instagram })
  if (captions.tiktok) socialCaptions.push({ platform: 'TikTok', caption: captions.tiktok })
  if (captions.twitter) socialCaptions.push({ platform: 'X', caption: captions.twitter })

  const emailRaw = result.emailCopy
  let emailCopy: CampaignGenerationResult['emailCopy'] = { subject: '', body: '' }
  if (typeof emailRaw === 'string') {
    emailCopy = { subject: 'Campaign update', body: emailRaw }
  } else if (emailRaw && typeof emailRaw === 'object') {
    emailCopy = emailRaw as CampaignGenerationResult['emailCopy']
  }

  let adScript: CampaignGenerationResult['adScript'] = {
    duration: '30 seconds',
    script: '',
  }
  const adScriptRaw = result.adScript
  if (typeof adScriptRaw === 'string') {
    adScript = { duration: '30 seconds', script: adScriptRaw }
  } else if (adScriptRaw && typeof adScriptRaw === 'object') {
    adScript = adScriptRaw as CampaignGenerationResult['adScript']
  }

  return {
    taglines: result.taglines ?? [],
    heroCopy: { headline, subheadline },
    socialCaptions,
    emailCopy,
    adScript,
    bannerUrl: result.bannerUrl ?? undefined,
    audioUrl: result.audioUrl ?? undefined,
    videoUrl: result.videoUrl ?? undefined,
    referenceImageUrl: result.referenceImageUrl ?? undefined,
  }
}

export function mapCampaignRecord(record: CampaignRecord): CampaignGenerationResult {
  return mapJobResultToCampaign({
    campaignId: record.id,
    adScript: record.ad_script ?? undefined,
    taglines: record.taglines ?? undefined,
    captions: record.captions ?? undefined,
    emailCopy: record.email_copy ?? undefined,
    heroCopy: record.hero_copy ?? undefined,
    bannerUrl: record.banner_url,
    audioUrl: record.audio_url,
    videoUrl: record.video_url,
    referenceImageUrl: record.reference_image_url,
  })
}
