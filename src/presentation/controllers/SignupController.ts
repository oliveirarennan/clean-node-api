import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest, serverError } from '../helpers/HttpHelper'
import { Controller } from '../interfaces/Controller'
import { EmailValidator } from '../interfaces/EmailValidator'
import { HttpRequest } from '../interfaces/HttpRequest'
import { HttpResponse } from '../interfaces/HttpResponse'

export class SignUpController implements Controller {
  constructor (private readonly emailValidador: EmailValidator) { }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'password_confirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidador.isValid(httpRequest.body.email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
