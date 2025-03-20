import { trpc } from '../lib/trpc'
import { getCategoriesTrpcRoute } from './getCategories'
import { getSubCategoriesTrpcRoute } from './getSubCategories'

export const trpcRouter = trpc.router({
  getCategories: getCategoriesTrpcRoute,
  getSubCategories: getSubCategoriesTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter
