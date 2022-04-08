import { Controller, HttpRequest, HttpResponse, EmailValidator, AddAccount, Validation } from './SignupInterfaces'
import { InvalidParamError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/HttpHelper'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidador: EmailValidator,
    private readonly addAccount: AddAccount,
    private readonly validation: Validation

  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
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
      return serverError(error)
    }
  }
}
