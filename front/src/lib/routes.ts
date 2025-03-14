const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
}

export const getAllCategoriesRoute = () => '/'

export const subCategoriesRouteParams = getRouteParams({ categoryId: true })
export type SubCategoriesRouteParams = typeof subCategoriesRouteParams
export const getSubCategoriesRoute = ({ categoryId }: SubCategoriesRouteParams) => `/ideas/${categoryId}`

export const getNewCategoryRoute = () => '/categories/new'
