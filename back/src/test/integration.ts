import { type Channel, type User } from '@prisma/client'
import _ from 'lodash'
import { createAppContext } from '../lib/ctx'
import { getTrpcContext, createCallerFactory } from '../lib/trpc'
import { trpcRouter } from '../router'
import { deepMap } from '../utils/deepMap'
import { getPasswordHash } from '../utils/getPasswordHash'
import { type ExpressRequest } from '../utils/types'

export const appContext = createAppContext()

afterAll(appContext.stop)

beforeEach(async () => {
  await appContext.prisma.channelLike.deleteMany()
  await appContext.prisma.channel.deleteMany()
  await appContext.prisma.user.deleteMany()
})

export const getTrpcCaller = (user?: User) => {
  const req = { user } as ExpressRequest
  const createCaller = createCallerFactory(trpcRouter)
  return createCaller(getTrpcContext({ appContext, req }))
}

export const withoutNoize = (input: any): any => {
  return deepMap(input, ({ value }) => {
    if (_.isObject(value) && !_.isArray(value)) {
      return _.entries(value).reduce((acc, [objectKey, objectValue]: [string, any]) => {
        if ([/^id$/, /Id$/, /At$/].some((regex) => regex.test(objectKey))) {
          return acc
        }
        return {
          ...acc,
          [objectKey]: objectValue,
        }
      }, {})
    }
    return value
  })
}

export const createUser = async ({ user = {}, number = 1 }: { user?: Partial<User>; number?: number } = {}) => {
  return await appContext.prisma.user.create({
    data: {
      nick: `user${number}`,
      email: `user${number}@example.com`,
      password: getPasswordHash(user.password || '1234'),
      ..._.omit(user, ['password']),
    },
  })
}

export const createChannel = async ({
  channel = {},
  author,
  number = 1,
}: {
  channel?: Partial<Channel>
  author: Pick<User, 'id'>
  number?: number
}) => {
  return await appContext.prisma.channel.create({
    data: {
      id: `channel${number}`,
      authorId: author.id,
      name: `Channel ${number}`,
      description: `Channel ${number} description`,
      text: `Channel ${number} text text text text text text text text text text text text text text text text text text text text text`,
      ...channel,
    },
  })
}

export const createChannelWithAuthor = async ({
  author,
  channel,
  number,
}: {
  author?: Partial<User>
  channel?: Partial<Channel>
  number?: number
} = {}) => {
  const createdUser = await createUser({ user: author, number })
  const createdChannel = await createChannel({ channel, author: createdUser, number })
  return {
    author: createdUser,
    channel: createdChannel,
  }
}

export const createChannelLike = async ({
  channel,
  liker,
  createdAt,
}: {
  channel: Pick<Channel, 'id'>
  liker: Pick<User, 'id'>
  createdAt?: Date
}) => {
  return await appContext.prisma.channelLike.create({
    data: {
      channelId: channel.id,
      userId: liker.id,
      createdAt,
    },
  })
}
