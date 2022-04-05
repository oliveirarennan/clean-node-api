import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/HttpHelper'
import { Controller, HttpRequest, HttpResponse } from '../../interfaces'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return await new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
  }
}
