import { zEnvHost, zEnvNonemptyTrimmed, zEnvNonemptyTrimmedRequiredOnNotLocal } from '@glimmung/shared/src/zod'
import * as dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const zEnv = z.object({
  PORT: zEnvNonemptyTrimmed,
  HOST_ENV: zEnvHost,
  DATABASE_URL: zEnvNonemptyTrimmed,
  JWT_SECRET: zEnvNonemptyTrimmed,
  PASSWORD_SALT: zEnvNonemptyTrimmed,
  INITIAL_ADMIN_PASSWORD: zEnvNonemptyTrimmed,
  FRONTEND_URL: zEnvNonemptyTrimmed,
  RUSENDER_API_KEY: zEnvNonemptyTrimmedRequiredOnNotLocal,
  FROM_EMAIL_NAME: zEnvNonemptyTrimmed,
  FROM_EMAIL_ADDRESS: zEnvNonemptyTrimmed,
  DEBUG: zEnvNonemptyTrimmed,
  BACKEND_SENTRY_DSN: zEnvNonemptyTrimmedRequiredOnNotLocal,
  SOURCE_VERSION: zEnvNonemptyTrimmedRequiredOnNotLocal,
})

export const env = zEnv.parse(process.env)
