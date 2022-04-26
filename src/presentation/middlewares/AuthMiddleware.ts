import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers/http/HttpHelper'
import { HttpRequest, HttpResponse, Middleware } from '../interfaces'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return forbidden(new AccessDeniedError())
  }
}
