import { Controller, HttpRequest, HttpResponse, EmailValidator, AddAccount } from './SignupInterfaces'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/HttpHelper'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidador: EmailValidator,
    private readonly addAccount: AddAccount

  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
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

      const account = await this.addAccount.execute({ name, email, password })

      return ok(account)
    } catch (error) {
      return serverError()
    }
  }
}
