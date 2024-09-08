import * as z from 'zod'

// Product Validator
export const productValidator = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  slug: z.string().min(1, { message: 'Slug is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  brand: z.string().optional(),
  categories: z
    .array(z.string())
    .nonempty({ message: 'At least one category is required' }),
  variants: z
    .array(
      z.object({
        attribute: z.string().min(1, { message: 'Attribute is required' }),
        attribute_options: z
          .array(z.string())
          .min(1, { message: 'At least one option is required' }),
        images: z
          .array(
            z.instanceof(File).refine((file) => file.size > 0, 'Invalid File')
          )
          .optional(),
      })
    )
    .optional(),
  images: z
    .array(z.instanceof(File).refine((file) => file.size > 0, 'Invalid File'))
    .optional(),
})
