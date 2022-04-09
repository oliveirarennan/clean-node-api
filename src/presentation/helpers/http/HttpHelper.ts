import { ServerError, UnauthorizedError } from '../../errors'
import { HttpResponse } from '../../interfaces/HttpResponse'

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const unauthorized = (): HttpResponse => {
  return {
    statusCode: 401,
    body: new UnauthorizedError()
  }
}

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})
