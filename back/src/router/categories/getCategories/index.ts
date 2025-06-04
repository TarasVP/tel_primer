import { trpcLoggedProcedure } from '../../../lib/trpc'
import { zGetCategoriesTrpcInput } from './input'

export const getCategoriesTrpcRoute = trpcLoggedProcedure
  .input(zGetCategoriesTrpcInput)
  .query(async ({ ctx, input }) => {
    const categories = await ctx.prisma.category.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        serialNumber: true,
      },
      where: {
        blockedAt: null,
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
        {
          serialNumber: 'desc',
        },
      ],
      cursor: input.cursor ? { serialNumber: input.cursor } : undefined,
      take: input.limit + 1,
    })

    const nextCategory = categories.at(input.limit)
    const nextCursor = nextCategory?.serialNumber
    const categoriesExceptNext = categories.slice(0, input.limit)

    return { categories: categoriesExceptNext, nextCursor }
  })
