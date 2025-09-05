import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import { createTrpcRouter } from '../lib/trpc'
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { getMeTrpcRoute } from './auth/getMe'
import { signInTrpcRoute } from './auth/signIn'
import { signUpTrpcRoute } from './auth/signUp'
import { updatePasswordTrpcRoute } from './auth/updatePassword'
import { updateProfileTrpcRoute } from './auth/updateProfile'
import { blockCategoryTrpcRoute } from './categories/blockCategory'
import { createCategoryTrpcRoute } from './categories/createCategory'
import { getCategoriesTrpcRoute } from './categories/getCategories'
import { getCategoryTrpcRoute } from './categories/getCategory'
import { updateCategoryTrpcRoute } from './categories/updateCategory'
import { createChannelTrpcRoute } from './channels/createChannel'
import { getChannelTrpcRoute } from './channels/getChannel'
import { getChannelsTrpcRoute } from './channels/getChannels'
import { setChannelLikeTrpcRoute } from './channels/setChannelLike'
import { updateChannelTrpcRoute } from './channels/updateChannel'
import { prepareCloudinaryUploadTrpcRoute } from './upload/prepareCloudinaryUpload'
// @endindex

export const trpcRouter = createTrpcRouter({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  getMe: getMeTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  updatePassword: updatePasswordTrpcRoute,
  updateProfile: updateProfileTrpcRoute,
  blockCategory: blockCategoryTrpcRoute,
  createCategory: createCategoryTrpcRoute,
  getCategories: getCategoriesTrpcRoute,
  getCategory: getCategoryTrpcRoute,
  updateCategory: updateCategoryTrpcRoute,
  createChannel: createChannelTrpcRoute,
  getChannel: getChannelTrpcRoute,
  getChannels: getChannelsTrpcRoute,
  setChannelLike: setChannelLikeTrpcRoute,
  updateChannel: updateChannelTrpcRoute,
  prepareCloudinaryUpload: prepareCloudinaryUploadTrpcRoute,
  // @endindex
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>
