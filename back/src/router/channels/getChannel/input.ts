import { z } from 'zod'

export const zChannelInput = z.object({
  channelId: z.string(),
})
