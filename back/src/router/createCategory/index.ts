import { categories } from '../../lib/categories'
import { trpc } from '../../lib/trpc'
import { zCreateCategoryTrpcInput } from './input'

export const createCategoryTrpcRoute = trpc.procedure.input(zCreateCategoryTrpcInput).mutation(({ input }) => {
  if (categories.find((category) => category.id === input.id)) {
    throw Error('Category with this id already exists')
  }
  categories.unshift(input)
  return true
})
