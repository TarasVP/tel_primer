import { CronJob } from 'cron'
import { type AppContext } from './ctx'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const applyCron = (ctx: AppContext) => {
  new CronJob(
    '*/5 * * * *', // At every 5th minute.
    () => {
      console.info('Hello!')
    },
    null, // onComplete
    true // start right now
  )
}
