import { startOfMonth, sub } from 'date-fns'
import { appContext, createChannelLike, createChannelWithAuthor, withoutNoize } from '../test/integration'
import { getMostLikedChannels } from './notifyAboutMostLikedChannels'

describe('getMostLikedChannels', () => {
  it('return most liked channels of prev month', async () => {
    // has 3 likes in prev month
    const { channel: channel1, author: author1 } = await createChannelWithAuthor({ number: 1 })

    // has 2 like in prev month, and 2 like in prev prev month
    const { channel: channel2, author: author2 } = await createChannelWithAuthor({ number: 2 })

    // has 1 like in prev month, and 1 like in prev prev month
    const { channel: channel3, author: author3 } = await createChannelWithAuthor({ number: 3 })

    // has 3 likes in prev prev month
    const { channel: channel4, author: author4 } = await createChannelWithAuthor({ number: 4 })

    // has no likes
    await createChannelWithAuthor({ number: 5 })

    const now = startOfMonth(new Date())
    const prevMonthDate = sub(now, {
      days: 10,
    })
    const prevPrevMonthDate = sub(now, {
      days: 10,
      months: 1,
    })

    await createChannelLike({ channel: channel1, liker: author1, createdAt: prevMonthDate })
    await createChannelLike({ channel: channel1, liker: author2, createdAt: prevMonthDate })
    await createChannelLike({ channel: channel1, liker: author3, createdAt: prevMonthDate })

    await createChannelLike({ channel: channel2, liker: author1, createdAt: prevMonthDate })
    await createChannelLike({ channel: channel2, liker: author2, createdAt: prevMonthDate })
    await createChannelLike({ channel: channel2, liker: author3, createdAt: prevPrevMonthDate })
    await createChannelLike({ channel: channel2, liker: author4, createdAt: prevPrevMonthDate })

    await createChannelLike({ channel: channel3, liker: author1, createdAt: prevMonthDate })
    await createChannelLike({ channel: channel3, liker: author2, createdAt: prevPrevMonthDate })

    await createChannelLike({ channel: channel4, liker: author1, createdAt: prevPrevMonthDate })
    await createChannelLike({ channel: channel4, liker: author2, createdAt: prevPrevMonthDate })
    await createChannelLike({ channel: channel4, liker: author3, createdAt: prevPrevMonthDate })

    expect(withoutNoize(await getMostLikedChannels(appContext, 2, now))).toMatchInlineSnapshot(`
[
  {
    "name": "Channel 1",
    "nick": "channel1",
    "thisMonthLikesCount": 3,
  },
  {
    "name": "Channel 2",
    "nick": "channel2",
    "thisMonthLikesCount": 2,
  },
]
`)
    expect(withoutNoize(await getMostLikedChannels(appContext, 10, now))).toMatchInlineSnapshot(`
[
  {
    "name": "Channel 1",
    "nick": "channel1",
    "thisMonthLikesCount": 3,
  },
  {
    "name": "Channel 2",
    "nick": "channel2",
    "thisMonthLikesCount": 2,
  },
  {
    "name": "Channel 3",
    "nick": "channel3",
    "thisMonthLikesCount": 1,
  },
]
`)
  })
})
