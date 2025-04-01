import { z } from 'zod'

export const zSubCategoryInput = z.object({
  categoryId: z.string(),
})
