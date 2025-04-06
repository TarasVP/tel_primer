import { z } from 'zod'

export const zCreateCategoryTrpcInput = z.object({
  name: z.string().min(1),
  id: z
    .string()
    .min(1)
    .regex(/^[0-9]+$/, 'Id may contain only numbers'),
  description: z.string().min(1),
  text: z.string().min(10, 'Text should be at least 10 characters long'),
})
