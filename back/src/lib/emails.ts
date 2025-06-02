import { promises as fs } from 'fs'
import path from 'path'
import { type Category, type User, type Channel } from '@prisma/client'
import fg from 'fast-glob'
import _ from 'lodash'
import { env } from './env'
import Handlebars from 'handlebars'
import { sendEmailThroughRusender } from './rusender'
import { getChannelRoute, getNewChannelRoute } from '@glimmung/front/src/lib/routes'
import { logger } from './logger'

const getHbrTemplates = _.memoize(async () => {
  const htmlPathsPattern = path.resolve(__dirname, '../emails/dist/**/*.html').replace(/\\/g, '/')
  const htmlPaths = fg.sync(htmlPathsPattern)
  const hbrTemplates: Record<string, HandlebarsTemplateDelegate> = {}
  for (const htmlPath of htmlPaths) {
    const templateName = path.basename(htmlPath, '.html')
    const htmlTemplate = await fs.readFile(htmlPath, 'utf8')
    hbrTemplates[templateName] = Handlebars.compile(htmlTemplate)
  }
  return hbrTemplates
})

const getEmailHtml = async (templateName: string, templateVariables: Record<string, string> = {}) => {
  const hbrTemplates = await getHbrTemplates()
  const hbrTemplate = hbrTemplates[templateName]
  const html = hbrTemplate(templateVariables)
  return html
}

const sendEmail = async ({
  to,
  subject,
  templateName,
  templateVariables = {},
}: {
  to: string
  subject: string
  templateName: string
  templateVariables?: Record<string, any>
}) => {
  try {
    const fullTemplateVaraibles = {
      ...templateVariables,
      homeUrl: env.FRONTEND_URL,
    }
    const html = await getEmailHtml(templateName, fullTemplateVaraibles)
    const { loggableResponse } = await sendEmailThroughRusender({ to, html, subject })
    logger.info('email', 'sendEmail', {
      to,
      subject,
      templateName,
      fullTemplateVaraibles,
      response: loggableResponse,
    })
    return { ok: true }
  } catch (error) {
    logger.error('email', error, {
      to,
      templateName,
      templateVariables,
    })
    return { ok: false }
  }
}

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
