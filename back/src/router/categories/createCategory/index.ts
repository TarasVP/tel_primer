import { trpc } from '../../../lib/trpc'
import { zCreateCategoryTrpcInput } from './input'

export const createCategoryTrpcRoute = trpc.procedure
  .input(zCreateCategoryTrpcInput)
  .mutation(async ({ input, ctx }) => {
    if (!ctx.me) {
      throw Error('Not authenticated')
    }
    const exCategory = await ctx.prisma.category.findUnique({
      where: {
        id: input.id,
      },
    })
    if (exCategory) {
      throw Error('Category with this nick already exists')
    }
    await ctx.prisma.category.create({
      data: {
        ...input,
        authorId: ctx.me.id,
      },
    })
    return true
  })
