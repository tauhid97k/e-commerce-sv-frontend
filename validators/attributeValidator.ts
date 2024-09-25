import * as z from 'zod'

export const attributeValidator = z.object({
  name: z.string().min(1, 'Name is required'),
  options: z.array(
    z.object({
      value: z.string().min(1, { message: 'Option is required' }),
    })
  ),
})
