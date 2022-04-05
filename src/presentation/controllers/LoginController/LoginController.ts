import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/HttpHelper'
import { Controller, HttpRequest, HttpResponse } from '../../interfaces'
import { EmailValidator } from '../SignupController/SignupInterfaces'

export class LoginController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return await new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
    }

    if (!httpRequest.body.password) {
      return await new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
    }

    this.emailValidator.isValid(httpRequest.body.email)
  }
}
