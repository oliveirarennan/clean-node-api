
import { LogMongoRepository } from '../../../infra/db/mongodb/LogRepository/LogRepository'
import { Controller } from '../../../presentation/interfaces/Controller'
import { LogControllerDecorator } from '../../decorators/LogControllerDecorator'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logMongoRepository = new LogMongoRepository()

  return new LogControllerDecorator(controller, logMongoRepository)
}
