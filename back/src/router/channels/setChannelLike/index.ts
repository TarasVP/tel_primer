import { trpc } from '../../../lib/trpc'
import { zSetChannelLikeTrpcInput } from './input'

export const setChannelLikeTrpcRoute = trpc.procedure
  .input(zSetChannelLikeTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const { channelId, isLikedByMe } = input
    if (!ctx.me) {
      throw new Error('UNAUTHORIZED')
    }
    const channel = await ctx.prisma.channel.findUnique({
      where: {
        id: channelId,
      },
    })
    if (!channel) {
      throw new Error('NOT_FOUND')
    }
    if (isLikedByMe) {
      await ctx.prisma.channelLike.upsert({
        where: {
          channelId_userId: {
            channelId,
            userId: ctx.me.id,
          },
        },
        create: {
          userId: ctx.me.id,
          channelId,
        },
        update: {},
      })
    } else {
      await ctx.prisma.channelLike.delete({
        where: {
          channelId_userId: {
            channelId,
            userId: ctx.me.id,
          },
        },
      })
    }
    const likesCount = await ctx.prisma.channelLike.count({
      where: {
        channelId,
      },
    })
    return {
      channel: {
        id: channel.id,
        likesCount,
        isLikedByMe,
      },
    }
  })
