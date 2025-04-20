import { z } from 'zod'

export const zBlockIdeaTrpcInput = z.object({
  categoryId: z.string().min(1),
})
