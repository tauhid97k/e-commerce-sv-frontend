import * as z from 'zod'

export const brandValidator = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required').max(255),
  website: z
    .string()
    .url({ message: 'Website url is invalid' })
    .optional()
    .or(z.literal('')),
  is_visible: z.boolean(),
  description: z.string().optional(),
  seo_title: z
    .string()
    .max(60, 'SEO title must be 60 characters or less')
    .optional(),
  seo_description: z
    .string()
    .max(160, 'SEO description must be 160 characters or less')
    .optional(),
})
