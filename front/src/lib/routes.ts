export const getAllCategoriesRoute = () => '/'
export const getSubCategoriesRoute = ({ categoryId }: { categoryId: string }) => `/ideas/${categoryId}`
