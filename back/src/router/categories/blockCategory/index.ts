import { sendCategoryBlockedEmail } from '../../../lib/emails'
import { trpcLoggedProcedure } from '../../../lib/trpc'
import { canBlockCategories } from '../../../utils/can'
import { zBlockCategoryTrpcInput } from './input'

export const blockCategoryTrpcRoute = trpcLoggedProcedure
  .input(zBlockCategoryTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const { categoryId } = input
    if (!canBlockCategories(ctx.me)) {
      throw new Error('PERMISSION_DENIED')
    }
    const category = await ctx.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        author: true,
      },
    })
    if (!category) {
      throw new Error('NOT_FOUND')
    }
    await ctx.prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        blockedAt: new Date(),
      },
    })
    void sendCategoryBlockedEmail({ user: category.author, category })
    return true
  })
