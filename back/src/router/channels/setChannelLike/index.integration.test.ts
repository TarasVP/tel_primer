import { appContext, createChannelWithAuthor, createUser, getTrpcCaller } from '../../../test/integration'

describe('setChannelLike', () => {
  it('create like', async () => {
    const { channel } = await createChannelWithAuthor({ number: 1 })
    const liker = await createUser({ number: 2 })
    const trpcCallerForLiker = getTrpcCaller(liker)
    const result = await trpcCallerForLiker.setChannelLike({
      channelId: channel.id,
      isLikedByMe: true,
    })
    expect(result).toMatchObject({
      channel: {
        isLikedByMe: true,
        likesCount: 1,
      },
    })
    const channelLikes = await appContext.prisma.channelLike.findMany()
    expect(channelLikes).toHaveLength(1)
    expect(channelLikes[0]).toMatchObject({
      channelId: channel.id,
      userId: liker.id,
    })
  })

  it('remove like', async () => {
    const { channel } = await createChannelWithAuthor({ number: 1 })
    const liker = await createUser({ number: 2 })
    const trpcCallerForLiker = getTrpcCaller(liker)
    const result1 = await trpcCallerForLiker.setChannelLike({
      channelId: channel.id,
      isLikedByMe: true,
    })
    expect(result1).toMatchObject({
      idechannela: {
        isLikedByMe: true,
        likesCount: 1,
      },
    })
    const result2 = await trpcCallerForLiker.setChannelLike({
      channelId: channel.id,
      isLikedByMe: false,
    })
    expect(result2).toMatchObject({
      channel: {
        isLikedByMe: false,
        likesCount: 0,
      },
    })
    const channelLikes = await appContext.prisma.channelLike.findMany()
    expect(channelLikes).toHaveLength(0)
  })
})
