import { initTRPC } from '@trpc/server'
import { TrpcRouter } from '../router'
import { type Express } from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { AppContext } from './ctx'
import superjson from 'superjson'
import { expressHandler } from 'trpc-playground/handlers/express'

export const trpc = initTRPC.context<AppContext>().create({
  transformer: superjson,
})
export const applyTrpcToExpressApp = async (expressApp: Express, appContext: AppContext, trpcRouter: TrpcRouter) => {
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
      createContext: () => appContext,
    })
  )

  expressApp.use(
    '/trpc-playground',
    await expressHandler({
      trpcApiEndpoint: '/trpc',
      playgroundEndpoint: '/trpc-playground',
      router: trpcRouter,
      request: {
        superjson: true,
      },
    })
  )
}
