export type CampaignGenerateRequest = {
  businessDescription: string
  productUrl?: string
  tone: 'energetic' | 'professional' | 'emotional' | 'funny'
  platform?: 'Instagram' | 'TikTok' | 'LinkedIn' | 'Email' | 'All'
}

export type CampaignGenerationResult = {
  taglines: string[]
  heroCopy: {
    headline: string
    subheadline: string
  }
  socialCaptions: {
    platform: string
    caption: string
  }[]
  emailCopy: {
    subject: string
    body: string
  }
  adScript: {
    duration: string
    script: string
  }
  bannerUrl?: string
  audioUrl?: string
  videoUrl?: string
}
