import { zStringRequired } from '@glimmung/shared/src/zod'
import { z } from 'zod'

export const zSignInTrpcInput = z.object({
  nick: zStringRequired,
  password: zStringRequired,
})
