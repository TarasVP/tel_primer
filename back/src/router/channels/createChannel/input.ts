import { zStringMin, zStringRequired } from '@glimmung/shared/src/zod'
import { z } from 'zod'

export const zCreateChannelTrpcInput = z.object({
  name: zStringRequired,
  description: zStringRequired,
  text: zStringMin(10),
})
