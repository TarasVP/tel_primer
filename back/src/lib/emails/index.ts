import { getChannelRoute, getNewChannelRoute } from '@glimmung/front/src/lib/routes'
import { type Category, type User, type Channel } from '@prisma/client'
import { sendEmail } from './utils'

export const sendWelcomeEmail = async ({ user }: { user: Pick<User, 'nick' | 'email'> }) => {
  return await sendEmail({
    to: user.email,
    subject: 'Thanks For Registration!',
    templateName: 'welcome',
    templateVariables: {
      userNick: user.nick,
      addIdeaUrl: `${getNewChannelRoute({ abs: true })}`,
    },
  })
}

export const sendCategoryBlockedEmail = async ({
  user,
  category,
}: {
  user: Pick<User, 'email'>
  category: Pick<Category, 'name'>
}) => {
  return await sendEmail({
    to: user.email,
    subject: 'Your category blocked!',
    templateName: 'categoryBlocked',
    templateVariables: {
      categoryName: category.name,
    },
  })
}

export const sendMostLikedChannelsEmail = async ({
  user,
  channels,
}: {
  user: Pick<User, 'email'>
  channels: Array<Pick<Channel, 'id' | 'name'>>
}) => {
  return await sendEmail({
    to: user.email,
    subject: 'Most Liked Channels!',
    templateName: 'mostLikedChannels',
    templateVariables: {
      channels: channels.map((channel) => ({
        name: channel.name,
        url: getChannelRoute({ abs: true, channelId: channel.id }),
      })),
    },
  })
}
