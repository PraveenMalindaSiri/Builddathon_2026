import type { CampaignGenerationResult } from '@/types/campaign'

export const mockCampaignResult: CampaignGenerationResult = {
  taglines: [
    'Style that moves with you',
    'Everyday fashion, effortlessly yours',
    'Wear the city, own the moment',
  ],
  heroCopy: {
    headline: 'Everyday fashion made effortless',
    subheadline:
      'Comfortable, stylish pieces for modern Sri Lankan life — shop the new collection today.',
  },
  socialCaptions: [
    {
      platform: 'Instagram',
      caption:
        'New drop is here. Casual wear that fits your day — link in bio. #ColomboStyle #NewArrivals',
    },
    {
      platform: 'TikTok',
      caption: 'POV: you found your new everyday fit. Shop the drop before it sells out.',
    },
    {
      platform: 'LinkedIn',
      caption:
        'We are growing our local fashion brand with pieces designed for comfort and confidence.',
    },
  ],
  emailCopy: {
    subject: 'Your new everyday look is here',
    body: 'Hi there,\n\nOur latest collection just dropped — effortless styles for work, weekends, and everything between.\n\nShop now and get free delivery in Colombo.\n\nCheers,\nThe Team',
  },
  adScript: {
    duration: '30 seconds',
    script:
      'Scene 1: Morning in Colombo. A young professional grabs a jacket from the rack.\nScene 2: Quick cuts — street, café, office — same outfit, different moments.\nVoiceover: "Everyday fashion made effortless."\nScene 3: Logo + "Shop the new collection."',
  },
}
