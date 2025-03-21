import { categories } from '../../lib/categories'
import { trpc } from '../../lib/trpc'
import { zCreateCategoryTrpcInput } from './input'

export const createCategoryTrpcRoute = trpc.procedure.input(zCreateCategoryTrpcInput).mutation(({ input }) => {
  categories.unshift(input)
  return true
})
