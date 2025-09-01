import { zEnvHost, zEnvNonemptyTrimmed, zEnvNonemptyTrimmedRequiredOnNotLocal } from '@glimmung/shared/src/zod'
import { z } from 'zod'

export const zEnv = z.object({
  SOURCE_VERSION: zEnvNonemptyTrimmedRequiredOnNotLocal,
  NODE_ENV: z.enum(['development', 'production']),
  HOST_ENV: zEnvHost,
  VITE_BACKEND_TRPC_URL: zEnvNonemptyTrimmed,
  VITE_FRONTEND_URL: zEnvNonemptyTrimmed,
  VITE_FRONTEND_SENTRY_DSN: zEnvNonemptyTrimmedRequiredOnNotLocal,
  VITE_CLOUDINARY_CLOUD_NAME: zEnvNonemptyTrimmed,
})

export const env = zEnv.parse(process.env)
