import { initTRPC } from '@trpc/server'
import _ from 'lodash'
import { z } from 'zod'

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
  description: `description ${i}`,
  text: _.times(100, (j) => `<p>Text paragraph ${j}...</p>`).join(''),
}))

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getCategories: trpc.procedure.query(() => {
    return { categories: categories.map((category) => _.pick(category, ['id', 'name', 'description'])) }
  }),
  getSubCategories: trpc.procedure
    .input(
      z.object({
        categoryId: z.string(),
      })
    )
    .query(({ input }) => {
      const category = categories.find((category) => category.id === input.categoryId)
      return { category: category || null }
    }),
})

export type TrpcRouter = typeof trpcRouter
