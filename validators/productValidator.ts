import * as z from 'zod'

// Product Validator
export const productValidator = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  slug: z.string().min(1, { message: 'Slug is required' }),
  description: z.string().optional(),
  images: z
    .array(z.instanceof(File).refine((file) => file.size > 0, 'Invalid File'))
    .optional(),
})
