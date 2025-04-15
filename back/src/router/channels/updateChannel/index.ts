import { trpc } from '../../../lib/trpc'
import { zUpdateChannelTrpcInput } from './input'

export const updateChannelTrpcRoute = trpc.procedure.input(zUpdateChannelTrpcInput).mutation(async ({ ctx, input }) => {
  const { channelId, ...channelInput } = input
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
  if (ctx.me.id !== channel.authorId) {
    throw new Error('NOT_YOUR_CHANNEL')
  }
  if (channel.name !== input.name) {
    const exChannel = await ctx.prisma.channel.findUnique({
      where: {
        name: input.name,
      },
    })
    if (exChannel) {
      throw new Error('Channel with this name already exists')
    }
  }
  await ctx.prisma.channel.update({
    where: {
      id: channelId,
    },
    data: {
      ...channelInput,
    },
  })
  return true
})
