import { ExpectedError } from '../../../lib/errors'
import { trpcLoggedProcedure } from '../../../lib/trpc'
import { zCreateCategoryTrpcInput } from './input'

export const createCategoryTrpcRoute = trpcLoggedProcedure
  .input(zCreateCategoryTrpcInput)
  .mutation(async ({ input, ctx }) => {
    if (!ctx.me) {
      throw new Error('Not authenticated')
    }
    const exCategory = await ctx.prisma.category.findUnique({
      where: {
        id: input.id,
      },
    })
    if (exCategory) {
      throw new ExpectedError('Category with this nick already exists')
    }
    await ctx.prisma.category.create({
      data: {
        ...input,
        authorId: ctx.me.id,
      },
    })
    return true
  })
