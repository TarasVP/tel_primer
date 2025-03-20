import { categories } from '../../lib/categories'
import { trpc } from '../../lib/trpc'
import _ from 'lodash'

export const getCategoriesTrpcRoute = trpc.procedure.query(() => {
  return { categories: categories.map((category) => _.pick(category, ['id', 'name', 'description'])) }
})
