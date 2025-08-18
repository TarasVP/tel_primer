import { type sendEmailThroughRusender } from './rusender'

jest.mock('./rusender', () => {
  const original = jest.requireActual('./rusender')
  const mockedSendEmailThroughRusender: typeof sendEmailThroughRusender = jest.fn(async () => {
    return {
      loggableResponse: {
        status: 200,
        statusText: 'OK',
        data: { message: 'Mocked' },
      },
    }
  })
  return {
    ...original,
    sendEmailThroughBrevo: mockedSendEmailThroughRusender,
  }
})
