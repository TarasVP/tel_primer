import { trpc } from '../../../lib/trpc'
import { zSubCategoryInput } from './input'

export const getCategoryTrpcRoute = trpc.procedure.input(zSubCategoryInput).query(async ({ ctx, input }) => {
  const category = await ctx.prisma.category.findUnique({
    where: {
      id: input.categoryId,
    },
    include: {
      author: {
        select: {
          id: true,
          nick: true,
          name: true,
        },
      },
    },
  })

  return { category }
})
