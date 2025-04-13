import { trpc } from '../../../lib/trpc'
import { zCreateChannelTrpcInput } from './input'

export const createChannelTrpcRoute = trpc.procedure.input(zCreateChannelTrpcInput).mutation(async ({ input, ctx }) => {
  if (!ctx.me) {
    throw Error('Not authenticated')
  }
  const exChannel = await ctx.prisma.channel.findUnique({
    where: {
      name: input.name,
    },
  })
  if (exChannel) {
    throw Error('Channel with this name already exists')
  }
  await ctx.prisma.channel.create({
    data: {
      ...input,
      authorId: ctx.me.id,
    },
  })
  return true
})
