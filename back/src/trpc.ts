import { initTRPC } from '@trpc/server'
import _ from 'lodash'

/* const categories = [
  { id: '1', name: 'Наука' },
  { id: '2', name: 'Спорт' },
  { id: '3', name: 'Политика' },
  { id: '4', name: 'Искусство' },
  { id: '5', name: 'Разное' },
] */

const categories = _.times(100, (i) => ({
  id: `${i}`,
  name: `category ${i}`,
  text: _.times(100, (j) => `<p>Text paragraph ${j}...</p>`).join(''),
}))

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getCategories: trpc.procedure.query(() => {
    return { categories: categories.map((category) => _.pick(category, ['id', 'name'])) }
  }),
})

export type TrpcRouter = typeof trpcRouter
