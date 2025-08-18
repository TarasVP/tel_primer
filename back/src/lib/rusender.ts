import { randomUUID } from 'crypto'
import { pick } from '@glimmung/shared/src/pick'
import axios, { type AxiosResponse } from 'axios'
import { env } from './env'

const makeRequestToRusender = async ({
  path,
  data,
}: {
  path: string
  data: Record<string, any>
}): Promise<{
  originalResponse?: AxiosResponse
  loggableResponse: Pick<AxiosResponse, 'status' | 'statusText' | 'data'>
}> => {
  if (env.NODE_ENV === 'test') {
    return {
      loggableResponse: {
        status: 200,
        statusText: 'OK',
        data: { message: 'test mode' },
      },
    }
  }

  if (!env.RUSENDER_API_KEY) {
    return {
      loggableResponse: {
        status: 200,
        statusText: 'OK',
        data: { message: 'RUSENDER_API_KEY is not set' },
      },
    }
  }
  const response = await axios({
    method: 'POST',
    url: `https://api.beta.rusender.ru/api/v1/${path}`,
    headers: {
      //accept: 'application/json',
      'X-Api-Key': env.RUSENDER_API_KEY,
      'Content-Type': 'application/json',
    },
    data,
  })
  return {
    originalResponse: response,
    loggableResponse: pick(response, ['status', 'statusText', 'data']),
  }
}

export const sendEmailThroughRusender = async ({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) => {
  return await makeRequestToRusender({
    path: 'external-mails/send/',
    data: {
      idempotencyKey: randomUUID(),
      mail: {
        subject,
        html,
        to: {
          email: to,
          name: to,
        },
        from: {
          email: env.FROM_EMAIL_ADDRESS,
          name: env.FROM_EMAIL_NAME,
        },
      },
      cc: '',
      bcc: '',
    },
  })
}
