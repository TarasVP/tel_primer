import { CronJob } from 'cron'
import { type AppContext } from './ctx'
import { notifyAboutMostLikedChannels } from '../scripts/notifyAboutMostLikedChannels'
import { logger } from './logger'

export const applyCron = (ctx: AppContext) => {
  new CronJob(
    '*/5 * * * *', // At every 5th minute.
    () => {
      notifyAboutMostLikedChannels(ctx).catch((error) => {
        logger.error('cron', error)
      })
    },
    null, // onComplete
    true // start right now
  )
}
