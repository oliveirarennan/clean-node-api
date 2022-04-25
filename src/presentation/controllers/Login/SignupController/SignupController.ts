import { Controller, HttpRequest, HttpResponse, AddAccount, Validation, Authentication } from './SignupControllerInterfaces'
import { badRequest, serverError, ok, forbidden } from '../../../helpers/http/HttpHelper'
import { EmailInUseError } from '../../../errors'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication

  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      const { name, email, password } = httpRequest.body

      const account = await this.addAccount.execute({ name, email, password })
      console.log(account)

      if (!account) {
        return forbidden(new EmailInUseError())
      }

      const accessToken = await this.authentication.auth({
        email,
        password
      })

      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}