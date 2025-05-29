import { type Channel } from '@prisma/client'
import { type AppContext } from '../lib/ctx'

export const notifyAboutMostLikedChannels = async (ctx: AppContext) => {
  const mostLikedChannels = await ctx.prisma.$queryRaw<
    Array<Pick<Channel, 'id' | 'name'> & { thisMonthLikesCount: number }>
  >`
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
      and  likes."createdAt" + INTERVAL '1 month' > NOW()
    group by 
      channels.id,
      channels.name
    having
      COUNT(likes.id) > 0
    order by 
      likesCount desc
    limit 3
  `
  console.info('Топ 3 наиболее популярных каналов', mostLikedChannels)
}
