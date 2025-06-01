import { zEmailRequired, zNickRequired, zStringRequired } from '@glimmung/shared/src/zod'
import { z } from 'zod'

export const zSignUpTrpcInput = z.object({
  nick: zNickRequired,
  password: zStringRequired,
  email: zEmailRequired,
})
