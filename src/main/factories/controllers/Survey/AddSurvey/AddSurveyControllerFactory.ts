
import { AddSurveyController } from '../../../../../presentation/controllers/Survey/AddSurveyController/AddSurveyController'
import { Controller } from '../../../../../presentation/interfaces/Controller'
import { makeLogControllerDecorator } from '../../../decorators/LogControllerDecoratorFactory'
import { makeDbAddSurvey } from '../../../usecases/Survey/addSurvey/DbAddSurveyFactory'
import { makeAddSurveyValidation } from './AddSurveyValidationFactory'

export const makeAddSurveyController = (): Controller => {
  const controller = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())

  return makeLogControllerDecorator(controller)
}
