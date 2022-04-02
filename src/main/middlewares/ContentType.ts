import { NextFunction, Request, Response } from 'express'

export const ContentType = (request: Request, response: Response, next: NextFunction): void => {
  response.type('json')

  next()
}
