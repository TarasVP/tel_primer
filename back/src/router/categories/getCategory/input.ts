import { zStringRequired } from '@glimmung/shared/src/zod'
import { z } from 'zod'

export const zSubCategoryInput = z.object({
  categoryId: zStringRequired,
})
