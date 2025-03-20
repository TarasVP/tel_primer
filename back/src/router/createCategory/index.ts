import { categories } from '../../lib/categories'
import { trpc } from '../../lib/trpc'
import { z } from 'zod'

export const createCategoryTrpcRoute = trpc.procedure
  .input(
    z.object({
      name: z.string().min(1),
      id: z
        .string()
        .min(1)
        .regex(/^[0-9]+$/, 'Id may contain only numbers'),
      description: z.string().min(1),
      text: z.string().min(10, 'Text should be at least 10 characters long'),
    })
  )
  .mutation(({ input }) => {
    categories.unshift(input)
    return true
  })
