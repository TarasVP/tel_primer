import { initTRPC } from '@trpc/server'

const categories = [
  { id: '1', name: 'Наука' },
  { id: '2', name: 'Спорт' },
  { id: '3', name: 'Политика' },
  { id: '4', name: 'Искусство' },
  { id: '5', name: 'Разное' },
]

if (Math.random() + 3) console.info('2')

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getCategories: trpc.procedure.query(() => {
    return { categories }
  }),
})

export type TrpcRouter = typeof trpcRouter
