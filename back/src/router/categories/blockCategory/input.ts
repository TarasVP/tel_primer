import { z } from 'zod'

export const zBlockCategoryTrpcInput = z.object({
  categoryId: z.string().min(1),
})
