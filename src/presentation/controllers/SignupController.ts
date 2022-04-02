import { AddAccount } from '../../domain/usecases/AddAccount'
import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest, serverError } from '../helpers/HttpHelper'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../interfaces'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidador: EmailValidator,
    private readonly addAccount: AddAccount

  ) { }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidador.isValid(email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      this.addAccount.execute({ name, email, password })
    } catch (error) {
      return serverError()
    }
  }
}
