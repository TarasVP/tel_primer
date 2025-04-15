const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
}

export const getAllCategoriesRoute = () => '/'

export const categoryRouteParams = getRouteParams({ categoryId: true })
export type CategoryRouteParams = typeof categoryRouteParams
export const getCategoryRoute = ({ categoryId }: CategoryRouteParams) => `/categories/${categoryId}`

export const getNewCategoryRoute = () => '/categories/new'
export const getSignUpRoute = () => '/sign-up'
export const getSignInRoute = () => '/sign-in'
export const getSignOutRoute = () => '/sign-out'
export const getEditProfileRoute = () => '/edit-profile'

export const editCategoryRouteParams = getRouteParams({ categoryId: true })
export type EditCategoryRouteParams = typeof editCategoryRouteParams
export const getEditCategoryRoute = ({ categoryId }: EditCategoryRouteParams) => `/categories/${categoryId}/edit`

export const getChannelsRoute = () => '/channels'
export const getNewChannelRoute = () => '/channels/new'

export const channelRouteParams = getRouteParams({ channelId: true })
export type ChannelRouteParams = typeof channelRouteParams
export const getChannelRoute = ({ channelId }: ChannelRouteParams) => `/channels/${channelId}`

export const editChannelRouteParams = getRouteParams({ channelId: true })
export type EditChannelRouteParams = typeof editChannelRouteParams
export const getEditChannelRoute = ({ channelId }: EditChannelRouteParams) => `/channels/${channelId}/edit`
