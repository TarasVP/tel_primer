import { z } from 'zod'

export const zSetChannelLikeTrpcInput = z.object({
  channelId: z.string().min(1),
  isLikedByMe: z.boolean(),
})
