import { zStringRequired } from '@glimmung/shared/src/zod'
import { z } from 'zod'

export const zBlockCategoryTrpcInput = z.object({
  categoryId: zStringRequired,
})
