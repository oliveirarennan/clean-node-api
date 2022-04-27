import { Request, RequestHandler, Response } from 'express'
import { Controller, HttpRequest } from '../../presentation/interfaces'

export const adaptRoute = (controller: Controller): RequestHandler => {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest = {
      body: request.body
    }
    const httpResponse = await controller.handle(httpRequest)

    if (httpResponse.statusCode >= 200 || httpResponse.statusCode <= 299) {
      response.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      response.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
