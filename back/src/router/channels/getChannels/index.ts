import { trpcLoggedProcedure } from '../../../lib/trpc'
import { zGetChannelsTrpcInput } from './input'
import _ from 'lodash'

export const getChannelsTrpcRoute = trpcLoggedProcedure.input(zGetChannelsTrpcInput).query(async ({ ctx, input }) => {
  // const normalizedSearch = input.search ? input.search.trim().replace(/[\s\n\t]/g, '_') : undefined
  const normalizedSearch = input.search ? input.search.trim().replace(/[\s\n\t]/g, ' & ') : undefined
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
    where: !input.search
      ? undefined
      : {
          OR: [
            {
              name: {
                search: normalizedSearch,
              },
            },
            {
              description: {
                search: normalizedSearch,
              },
            },
            {
              text: {
                search: normalizedSearch,
              },
            },
          ],
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
