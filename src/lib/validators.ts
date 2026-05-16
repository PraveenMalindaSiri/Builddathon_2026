import { z } from 'zod'

export const pitchFormSchema = z.object({
  idea: z.string().min(20, 'Please describe your idea in at least 20 characters.'),
  country: z.string().min(1, 'Country is required.'),
  industry: z.string().optional(),
  founderContext: z.string().optional(),
  outputTone: z.enum(['professional', 'friendly', 'investor-ready']).optional(),
})

export type PitchFormValues = z.infer<typeof pitchFormSchema>

export const campaignFormSchema = z.object({
  businessDescription: z
    .string()
    .min(20, 'Please describe your business in at least 20 characters.'),
  productUrl: z
    .string()
    .optional()
    .refine((v) => !v || v === '' || /^https?:\/\/.+/.test(v), 'Enter a valid URL'),
  tone: z.enum(['energetic', 'professional', 'emotional', 'funny']),
  platform: z.enum(['Instagram', 'TikTok', 'LinkedIn', 'Email', 'All']).optional(),
})

export type CampaignFormValues = z.infer<typeof campaignFormSchema>
