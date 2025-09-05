import { omit } from '@glimmung/shared/src/omit'
import { trpcLoggedProcedure } from '../../../lib/trpc'
import { zChannelInput } from './input'

export const getChannelTrpcRoute = trpcLoggedProcedure.input(zChannelInput).query(async ({ ctx, input }) => {
  const rawChannel = await ctx.prisma.channel.findUnique({
    where: {
      id: input.channelId,
    },
    include: {
      author: {
        select: {
          id: true,
          nick: true,
          name: true,
          avatar: true,
        },
      },
      channelsLikes: {
        select: {
          id: true,
        },
        where: {
          userId: ctx.me?.id,
        },
      },
      _count: {
        select: {
          channelsLikes: true,
        },
      },
    },
  })
  const isLikedByMe = !!rawChannel?.channelsLikes.length
  const likesCount = rawChannel?._count.channelsLikes || 0
  const channel = rawChannel && { ...omit(rawChannel, ['channelsLikes', '_count']), isLikedByMe, likesCount }

  return { channel }
})
