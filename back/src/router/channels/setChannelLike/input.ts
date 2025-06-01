import { zStringRequired } from '@glimmung/shared/src/zod'
import { z } from 'zod'

export const zSetChannelLikeTrpcInput = z.object({
  channelId: zStringRequired,
  isLikedByMe: z.boolean(),
})
