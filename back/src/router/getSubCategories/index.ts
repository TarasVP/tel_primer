import { z } from 'zod'
import { trpc } from '../../lib/trpc'

export const getSubCategoriesTrpcRoute = trpc.procedure
  .input(
    z.object({
      categoryId: z.string(),
    })
  )
  /* .query(({ input }) => {
    const category = categories.find((category) => category.id === input.categoryId)
    return { category: category || null }
  }) */
  .query(async ({ ctx, input }) => {
    const category = await ctx.prisma.category.findUnique({
      where: {
        id: input.categoryId,
      },
    })

    return { category }
  })
