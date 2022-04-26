import { LoadAccountByToken } from '../../domain/usecases/LoadAccountByToken'
import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers/http/HttpHelper'
import { HttpRequest, HttpResponse, Middleware } from '../interfaces'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']

    if (accessToken) {
      await this.loadAccountByToken.load(accessToken)
    }
    return forbidden(new AccessDeniedError())
  }
}
