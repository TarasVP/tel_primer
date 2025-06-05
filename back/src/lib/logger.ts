import { EOL } from 'os'
import _ from 'lodash'
import pc from 'picocolors'
import { serializeError } from 'serialize-error'
import { MESSAGE } from 'triple-beam'
import winston from 'winston'
import * as yaml from 'yaml'
import { env } from './env'
import debug from 'debug'
import { deepMap } from '../utils/deepMap'

export const winstonLogger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'back', hostEnv: env.HOST_ENV },
  transports: [
    new winston.transports.Console({
      format:
        env.HOST_ENV !== 'local'
          ? winston.format.json()
          : winston.format((logData) => {
              const setColor = {
                info: (str: string) => pc.blue(str),
                error: (str: string) => pc.red(str),
                debug: (str: string) => pc.cyan(str),
              }[logData.level as 'info' | 'error' | 'debug']
              const levelAndType = `${logData.level} ${logData.logType}`
              const topMessage = `${setColor(levelAndType)} ${pc.green(typeof logData.timestamp === 'string' ? logData.timestamp : '')}${EOL}${logData.message}`

              const visibleMessageTags = _.omit(logData, [
                'level',
                'logType',
                'timestamp',
                'message',
                'service',
                'hostEnv',
              ])

              const stringifyedLogData = _.trim(
                yaml.stringify(visibleMessageTags, (_k, v) => (_.isFunction(v) ? 'Function' : v))
              )

              const resultLogData = {
                ...logData,
                [MESSAGE]:
                  [topMessage, Object.keys(visibleMessageTags).length > 0 ? `${EOL}${stringifyedLogData}` : '']
                    .filter(Boolean)
                    .join('') + EOL,
              }

              return resultLogData
            })(),
    }),
  ],
})

type Meta = Record<string, any> | undefined

const prepareMeta = (meta: Meta): Meta => {
  return deepMap(meta, ({ key, value }) => {
    if (
      ['email', 'password', 'passwordAgain', 'newPassword', 'oldPassword', 'token', 'text', 'description'].includes(key)
    ) {
      return '🙈'
    }
    return value
  })
}

export const logger = {
  info: (logType: string, message: string, meta?: Meta) => {
    if (!debug.enabled(`glimmung:${logType}`)) {
      return
    }
    winstonLogger.info(message, { logType, ...prepareMeta(meta) })
  },
  error: (logType: string, error: any, meta?: Meta) => {
    if (!debug.enabled(`glimmung:${logType}`)) {
      return
    }
    const serializedError = serializeError(error)
    winstonLogger.error(serializedError.message || 'Unknown error', {
      logType,
      error,
      errorStack: serializedError.stack,
      ...prepareMeta(meta),
    })
  },
}
