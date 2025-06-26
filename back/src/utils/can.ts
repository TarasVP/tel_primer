import type { Category, User, UserPermission } from '@prisma/client'

type MaybeUser = Pick<User, 'permissions' | 'id'> | null
type MaybeCategory = Pick<Category, 'authorId'> | null

export const hasPermission = (user: MaybeUser, permission: UserPermission) => {
  return user?.permissions.includes(permission) || user?.permissions.includes('ALL') || false
}

export const canBlockCategories = (user: MaybeUser) => {
  return hasPermission(user, 'BLOCK_CATEGORIES')
}

export const canEditCategory = (user: MaybeUser, category: MaybeCategory) => {
  return !!user && !!category && user?.id === category?.authorId
}
