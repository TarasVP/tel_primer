import { trpc } from '../../lib/trpc'
import { zSubCategoryInput } from './input'

export const getSubCategoriesTrpcRoute = trpc.procedure
  .input(zSubCategoryInput)
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
