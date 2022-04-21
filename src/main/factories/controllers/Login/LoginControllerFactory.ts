
import { LoginController } from '../../../../presentation/controllers/LoginController/LoginController'
import { Controller } from '../../../../presentation/interfaces/Controller'
import { makeLogControllerDecorator } from '../../decorators/LogControllerDecoratorFactory'
import { makeDbAuthentication } from '../../usecases/authentication/DbAuthenticationFactory'
import { makeLoginValidation } from './LoginValidationFactory'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidation())

  return makeLogControllerDecorator(controller)
}
