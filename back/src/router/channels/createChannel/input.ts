import { z } from 'zod'

export const zCreateChannelTrpcInput = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  text: z.string().min(10, 'Text should be at least 10 characters long'),
})
