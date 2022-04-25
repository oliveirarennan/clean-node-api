import { badRequest, noContent, serverError } from '../../../helpers/http/HttpHelper'
import { AddSurvey, Controller, HttpRequest, HttpResponse, Validation } from './AddSurveyControllerInterfaces'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      const { question, answers } = httpRequest.body

      await this.addSurvey.add({ answers, question })

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
