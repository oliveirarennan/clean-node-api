import { MissingParamError } from '../errors/MissingParamError'
import { badRequest } from '../helpers/HttpHelper'
import { Controller } from '../interfaces/Controller'
import { HttpRequest } from '../interfaces/HttpRequest'
import { HttpResponse } from '../interfaces/HttpResponse'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'password_confirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
