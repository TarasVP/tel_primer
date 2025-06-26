import { canEditCategory, hasPermission } from './can'

describe('can', () => {
  it('hasPermission return true for user with this permission', () => {
    expect(hasPermission({ permissions: ['BLOCK_CATEGORIES'], id: 'x' }, 'BLOCK_CATEGORIES')).toBe(true)
  })

  it('hasPermission return false for user without this permission', () => {
    expect(hasPermission({ permissions: [], id: 'x' }, 'BLOCK_CATEGORIES')).toBe(false)
  })

  it('hasPermission return true for user with "ALL" permission', () => {
    expect(hasPermission({ permissions: ['ALL'], id: 'x' }, 'BLOCK_CATEGORIES')).toBe(true)
  })

  it('only author can edit his category', () => {
    expect(canEditCategory({ permissions: [], id: 'x' }, { authorId: 'x' })).toBe(true)
    expect(canEditCategory({ permissions: [], id: 'hacker' }, { authorId: 'x' })).toBe(false)
  })
})
