import express from 'express'
import { trpcRouter } from './router/index'
import cors from 'cors'
import { applyTrpcToExpressApp } from './lib/trpc'
import { type AppContext, createAppContext } from './lib/ctx'
import { applyPassportToExpressApp } from './lib/passport'

void (async () => {
  let ctx: AppContext | null = null
  try {
    ctx = createAppContext()

    const expressApp = express()
    expressApp.use(cors())

    /* expressApp.get('/ping', (req, res) => {
      res.send('pong')
    }) */

    applyPassportToExpressApp(expressApp, ctx)
    await applyTrpcToExpressApp(expressApp, ctx, trpcRouter)

    expressApp.listen(3000, () => {
      console.info('Listen ah http://localhost:3000/trpc/getCategories')
    })
  } catch (error) {
    console.error(error)
    void ctx?.stop()
  }
})()
