import { z } from 'zod'
import { categories } from '../../lib/categories'
import { trpc } from '../../lib/trpc'

export const getSubCategoriesTrpcRoute = trpc.procedure
  .input(
    z.object({
      categoryId: z.string(),
    })
  )
  .query(({ input }) => {
    const category = categories.find((category) => category.id === input.categoryId)
    return { category: category || null }
  })
