import { trpc } from '../../../lib/trpc'
import { zChannelInput } from './input'

export const getChannelTrpcRoute = trpc.procedure.input(zChannelInput).query(async ({ ctx, input }) => {
  const channel = await ctx.prisma.channel.findUnique({
    where: {
      id: input.channelId,
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

  return { channel }
})
