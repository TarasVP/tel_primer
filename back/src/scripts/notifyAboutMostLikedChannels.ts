import { Prisma, type Channel } from '@prisma/client'
import { type AppContext } from '../lib/ctx'
import { sendMostLikedChannelsEmail } from '../lib/emails'

export const getMostLikedChannels = async ({
  ctx,
  limit = 10,
  now,
}: {
  ctx: AppContext
  limit?: number
  now?: Date
}) => {
  const sqlNow = now ? Prisma.sql`${now.toISOString()}::timestamp` : Prisma.sql`now()`
  return await ctx.prisma.$queryRaw<Array<Pick<Channel, 'id' | 'name'> & { thisMonthLikesCount: number }>>`
    select 
      channels.id,
      channels.name,
      COUNT(likes.id) as likesCount
    from
      "Channel" AS channels
    left join
      "ChannelLike" AS likes
    on
      channels."id" = likes."channelId"
      and  likes."createdAt" + INTERVAL '1 month' > ${sqlNow}
    group by 
      channels.id,
      channels.name
    having
      COUNT(likes.id) > 0
    order by 
      likesCount desc
    limit ${limit}
  `
}

export const notifyAboutMostLikedChannels = async ({
  ctx,
  limit,
  now,
}: {
  ctx: AppContext
  limit?: number
  now?: Date
}) => {
  const mostLikedChannels = await getMostLikedChannels({ ctx, limit, now })
  if (!mostLikedChannels.length) {
    return
  }
  const users = await ctx.prisma.user.findMany({
    select: {
      email: true,
    },
  })
  for (const user of users) {
    await sendMostLikedChannelsEmail({ user, channels: mostLikedChannels })
  }
}
