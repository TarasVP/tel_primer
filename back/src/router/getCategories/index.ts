import { trpc } from '../../lib/trpc'

export const getCategoriesTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  //return { categories: categories.map((category) => _.pick(category, ['id', 'name', 'description'])) }
  const categories = await ctx.prisma.category.findMany({
    select: {
      id: true,
      name: true,
      description: true,
    },
  })

  return { categories }
})
