import { zStringMin, zStringRequired } from '@glimmung/shared/src/zod'
import { z } from 'zod'

export const zCreateCategoryTrpcInput = z.object({
  name: zStringRequired,
  id: z
    .string()
    .min(1)
    .regex(/^[0-9]+$/, 'Id may contain only numbers'),
  description: z.string().min(1),
  text: zStringMin(30),
})
