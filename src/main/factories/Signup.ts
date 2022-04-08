import { DbAddAccount } from '../../data/usecases/AddAccount/DbAddAccount'
import { BcryptAdapter } from '../../infra/criptography/BcryptAdapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/AccountRepository/AccountRepository'
import { LogMongoRepository } from '../../infra/db/mongodb/LogRepository/LogRepository'
import { SignUpController } from '../../presentation/controllers/SignupController/SignupController'
import { Controller } from '../../presentation/interfaces'
import { EmailValidatorAdapter } from '../../utils/EmailValidatorAdapter'
import { LogControllerDecorator } from '../decorators/Log'
import { makeSignUpValidation } from './SignupValidation'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)

  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount, makeSignUpValidation())
  const logMongoRepository = new LogMongoRepository()

  return new LogControllerDecorator(signUpController, logMongoRepository)
}
