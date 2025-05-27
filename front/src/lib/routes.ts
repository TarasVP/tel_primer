import { pgr } from '../utils/pumpGetRoute'

export const getSignUpRoute = pgr(() => '/sign-up')

export const getSignInRoute = pgr(() => '/sign-in')

export const getSignOutRoute = pgr(() => '/sign-out')

export const getEditProfileRoute = pgr(() => '/edit-profile')

export const getAllCategoriesRoute = pgr(() => '/')

export const getCategoryRoute = pgr({ categoryId: true }, ({ categoryId }) => `/categories/${categoryId}`)

export const getEditCategoryRoute = pgr({ categoryId: true }, ({ categoryId }) => `/categories/${categoryId}/edit`)

export const getNewCategoryRoute = pgr(() => '/categories/new')

export const getChannelsRoute = pgr(() => '/channels')

export const getChannelRoute = pgr({ channelId: true }, ({ channelId }) => `/chanels/${channelId}`)

export const getEditChannelRoute = pgr({ channelId: true }, ({ channelId }) => `/chanels/${channelId}/edit`)

export const getNewChannelRoute = pgr(() => '/channels/new')
