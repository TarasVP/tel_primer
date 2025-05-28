import express from 'express'
import { trpcRouter } from './router/index'
import cors from 'cors'
import { applyTrpcToExpressApp } from './lib/trpc'
import { type AppContext, createAppContext } from './lib/ctx'
import { applyPassportToExpressApp } from './lib/passport'
import { env } from './lib/env'
import { presetDb } from './scripts/presetDb'
import { applyCron } from './lib/cron'

void (async () => {
  let ctx: AppContext | null = null
  try {
    ctx = createAppContext()
    await presetDb(ctx)

    const expressApp = express()
    expressApp.use(cors())

    applyPassportToExpressApp(expressApp, ctx)
    await applyTrpcToExpressApp(expressApp, ctx, trpcRouter)
    applyCron(ctx)

    expressApp.listen(env.PORT, () => {
      console.info(`Listen ah http://localhost:${env.PORT}/trpc/getCategories`)
    })
  } catch (error) {
    console.error(error)
    void ctx?.stop()
  }
})()
