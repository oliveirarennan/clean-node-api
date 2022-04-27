import { NextFunction, Request, RequestHandler, Response } from 'express'
import { HttpRequest, Middleware } from '../../presentation/interfaces'

export const adaptMiddleware = (middleware: Middleware): RequestHandler => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      headers: request.headers
    }
    const httpResponse = await middleware.handle(httpRequest)

    if (httpResponse.statusCode === 200) {
      Object.assign(request, httpResponse.body)
      next()
    } else {
      response.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
