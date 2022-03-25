import { ServerError } from '../errors/ServerError'
import { HttpResponse } from '../interfaces/HttpResponse'

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})
