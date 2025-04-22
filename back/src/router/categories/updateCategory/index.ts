import { trpc } from '../../../lib/trpc'
import { zUpdateCtegoryTrpcInput } from './input'

export const updateCategoryTrpcRoute = trpc.procedure
  .input(zUpdateCtegoryTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const { categoryId, ...categoryInput } = input
    if (!ctx.me) {
      throw new Error('UNAUTHORIZED')
    }
    const category = await ctx.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    })
    if (!category) {
      throw new Error('NOT_FOUND')
    }
    if (ctx.me.id !== category.authorId) {
      throw new Error('NOT_YOUR_CATEGORY')
    }
    if (category.name !== input.name) {
      const exCategory = await ctx.prisma.category.findUnique({
        where: {
          name: input.name,
        },
      })
      if (exCategory) {
        throw new Error('Category with this nick already exists')
      }
    }
    await ctx.prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        ...categoryInput,
      },
    })
    return true
  })
