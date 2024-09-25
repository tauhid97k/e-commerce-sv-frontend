import * as z from 'zod'

export const categoryValidator = z.object({
  parent_id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required').max(255),
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
