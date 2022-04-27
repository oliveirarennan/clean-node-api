import { SignUpController } from '../../../../../presentation/controllers/Login/SignupController/SignupController'
import { Controller } from '../../../../../presentation/interfaces'
import { makeLogControllerDecorator } from '../../../decorators/LogControllerDecoratorFactory'
import { makeDbAddAccount } from '../../../usecases/Account/addAccount/DbAddAccountFactory'
import { makeDbAuthentication } from '../../../usecases/Account/authentication/DbAuthenticationFactory'
import { makeSignUpValidation } from './SignupValidationFactory'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())

  return makeLogControllerDecorator(controller)
}
