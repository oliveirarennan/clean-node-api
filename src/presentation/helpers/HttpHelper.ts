import { HttpResponse } from '../interfaces/HttpResponse'

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}
