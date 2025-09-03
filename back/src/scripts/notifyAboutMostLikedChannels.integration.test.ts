import { appContext, createChannelLike, createChannelWithAuthor, withoutNoize } from '../test/integration'
import { startOfMonth, sub } from 'date-fns'
import { sendEmail } from '../lib/emails/utils'
import { getMostLikedChannels, notifyAboutMostLikedChannels } from './notifyAboutMostLikedChannels'

const createData = async (now: Date) => {
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
}

describe('getMostLikedChannels', () => {
  it('return most liked channels of prev month', async () => {
    const now = startOfMonth(new Date())
    await createData(now)

    expect(withoutNoize(await getMostLikedChannels({ ctx: appContext, limit: 2, now }))).toMatchInlineSnapshot(`
[
  {
    "likescount": 3n,
    "name": "Channel 1",
  },
  {
    "likescount": 2n,
    "name": "Channel 2",
  },
]
`)
    expect(withoutNoize(await getMostLikedChannels({ ctx: appContext, limit: 2, now }))).toMatchInlineSnapshot(`
[
  {
    "likescount": 3n,
    "name": "Channel 1",
  },
  {
    "likescount": 2n,
    "name": "Channel 2",
  },
]
`)
  })
})

describe('notifyAboutMostLikedChannels', () => {
  it('send list of channels to users', async () => {
    const now = startOfMonth(new Date())
    await createData(now)
    await notifyAboutMostLikedChannels({ ctx: appContext, limit: 2, now })
    expect(sendEmail).toHaveBeenCalledTimes(5)
    const calls = jest.mocked(sendEmail).mock.calls
    const prettifiedCallProps = calls.map(([props]) => withoutNoize(props))
    expect(prettifiedCallProps).toMatchInlineSnapshot(`
[
  {
    "subject": "Most Liked Channels!",
    "templateName": "mostLikedChannels",
    "templateVariables": {
      "channels": [
        {
          "name": "Channel 1",
        },
        {
          "name": "Channel 2",
        },
      ],
    },
    "to": "user1@example.com",
  },
  {
    "subject": "Most Liked Channels!",
    "templateName": "mostLikedChannels",
    "templateVariables": {
      "channels": [
        {
          "name": "Channel 1",
        },
        {
          "name": "Channel 2",
        },
      ],
    },
    "to": "user2@example.com",
  },
  {
    "subject": "Most Liked Channels!",
    "templateName": "mostLikedChannels",
    "templateVariables": {
      "channels": [
        {
          "name": "Channel 1",
        },
        {
          "name": "Channel 2",
        },
      ],
    },
    "to": "user3@example.com",
  },
  {
    "subject": "Most Liked Channels!",
    "templateName": "mostLikedChannels",
    "templateVariables": {
      "channels": [
        {
          "name": "Channel 1",
        },
        {
          "name": "Channel 2",
        },
      ],
    },
    "to": "user4@example.com",
  },
  {
    "subject": "Most Liked Channels!",
    "templateName": "mostLikedChannels",
    "templateVariables": {
      "channels": [
        {
          "name": "Channel 1",
        },
        {
          "name": "Channel 2",
        },
      ],
    },
    "to": "user5@example.com",
  },
]
`)
  })
})
