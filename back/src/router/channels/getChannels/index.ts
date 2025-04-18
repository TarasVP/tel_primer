import { trpc } from '../../../lib/trpc'
import { zGetChannelsTrpcInput } from './input'
import _ from 'lodash'

export const getChannelsTrpcRoute = trpc.procedure.input(zGetChannelsTrpcInput).query(async ({ ctx, input }) => {
  const rawChannels = await ctx.prisma.channel.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      serialNumber: true,
      _count: {
        select: {
          channelsLikes: true,
        },
      },
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

  const nextChannel = rawChannels.at(input.limit)
  const nextCursor = nextChannel?.serialNumber
  const rawChannelsExceptNext = rawChannels.slice(0, input.limit)
  const channelsExceptNext = rawChannelsExceptNext.map((channel) => ({
    ..._.omit(channel, ['_count']),
    likesCount: channel._count.channelsLikes,
  }))

  return { channels: channelsExceptNext, nextCursor }
})
