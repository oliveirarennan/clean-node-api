import { LogErrorRepository } from '../../data/interfaces/LogErrorRepository'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/interfaces'

export class LogControllerDecorator implements Controller {
  constructor (private readonly controller: Controller, private readonly logError: LogErrorRepository) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)

    if (httpResponse.statusCode === 500) {
      await this.logError.logError(httpResponse.body.stack)
    }

    return httpResponse
  }
}
