import { ExpectedError } from '../../../lib/errors'
import { trpcLoggedProcedure } from '../../../lib/trpc'
import { zCreateChannelTrpcInput } from './input'

export const createChannelTrpcRoute = trpcLoggedProcedure
  .input(zCreateChannelTrpcInput)
  .mutation(async ({ input, ctx }) => {
    if (!ctx.me) {
      throw new Error('Not authenticated')
    }
    const exChannel = await ctx.prisma.channel.findUnique({
      where: {
        name: input.name,
      },
    })
    if (exChannel) {
      throw new ExpectedError('Channel with this name already exists')
    }
    await ctx.prisma.channel.create({
      data: {
        ...input,
        authorId: ctx.me.id,
      },
    })
    return true
  })
