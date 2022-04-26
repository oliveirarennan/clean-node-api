import { LoadAccountByToken } from '../../domain/usecases/LoadAccountByToken'
import { AccessDeniedError } from '../errors'
import { forbidden, ok, serverError } from '../helpers/http/HttpHelper'
import { HttpRequest, HttpResponse, Middleware } from '../interfaces'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']

      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken)

        if (account) {
          return ok({
            accountId: account.id
          })
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}
