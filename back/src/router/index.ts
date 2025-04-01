import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import { trpc } from '../lib/trpc'
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { createCategoryTrpcRoute } from './createCategory'
import { getCategoriesTrpcRoute } from './getCategories'
import { getMeTrpcRoute } from './getMe'
import { getCategoryTrpcRoute } from './getCategory'
import { signInTrpcRoute } from './signIn'
import { signUpTrpcRoute } from './signUp'
import { updateCategoryTrpcRoute } from './updateCategory'
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  createCategory: createCategoryTrpcRoute,
  getCategories: getCategoriesTrpcRoute,
  getMe: getMeTrpcRoute,
  getCategory: getCategoryTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  updateCategory: updateCategoryTrpcRoute,
  // @endindex
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>
