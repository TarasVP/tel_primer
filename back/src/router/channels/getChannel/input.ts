import { zStringRequired } from '@glimmung/shared/src/zod'
import { z } from 'zod'

export const zChannelInput = z.object({
  channelId: zStringRequired,
})
