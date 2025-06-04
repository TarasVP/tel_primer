import { trpcLoggedProcedure } from '../../../lib/trpc'
import { zSubCategoryInput } from './input'

export const getCategoryTrpcRoute = trpcLoggedProcedure.input(zSubCategoryInput).query(async ({ ctx, input }) => {
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
  if (category?.blockedAt) {
    throw new Error('Category is blocked by administrator')
  }

  return { category }
})
