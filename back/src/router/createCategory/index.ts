import { trpc } from '../../lib/trpc'
import { zCreateCategoryTrpcInput } from './input'

export const createCategoryTrpcRoute = trpc.procedure
  .input(zCreateCategoryTrpcInput)
  .mutation(async ({ input, ctx }) => {
    const exIdea = await ctx.prisma.category.findUnique({
      where: {
        id: input.id,
      },
    })
    if (exIdea) {
      throw Error('Idea with this nick already exists')
    }
    await ctx.prisma.category.create({
      data: input,
    })
    return true
  })
