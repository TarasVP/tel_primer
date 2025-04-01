import { z } from 'zod'
import { zCreateCategoryTrpcInput } from '../createCategory/input'

export const zUpdateCtegoryTrpcInput = zCreateCategoryTrpcInput.extend({
  categoryId: z.string().min(1),
})
