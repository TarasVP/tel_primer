import { trpc } from '../../../lib/trpc'
import { zGetChannelsTrpcInput } from './input'

export const getChannelsTrpcRoute = trpc.procedure.input(zGetChannelsTrpcInput).query(async ({ ctx, input }) => {
  const channels = await ctx.prisma.channel.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      serialNumber: true,
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

  const nextChannel = channels.at(input.limit)
  const nextCursor = nextChannel?.serialNumber
  const channelsExceptNext = channels.slice(0, input.limit)

  return { channels: channelsExceptNext, nextCursor }
})
