import { zStringRequired } from '@glimmung/shared/src/zod'
import { zCreateCategoryTrpcInput } from '../createCategory/input'

export const zUpdateCtegoryTrpcInput = zCreateCategoryTrpcInput.extend({
  categoryId: zStringRequired,
})
