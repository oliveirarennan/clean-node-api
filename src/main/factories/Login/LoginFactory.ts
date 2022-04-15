import { DbAuthentication } from '../../../data/usecases/Authentication/DbAuthentication'
import { BcryptAdapter } from '../../../infra/criptography/BcryptAdapter/BcryptAdapter'
import { JwtAdapter } from '../../../infra/criptography/JwtAdapter/JwtAdapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/AccountRepository/AccountRepository'
import { LogMongoRepository } from '../../../infra/db/mongodb/LogRepository/LogRepository'
import { LoginController } from '../../../presentation/controllers/LoginController/LoginController'
import { Controller } from '../../../presentation/interfaces/Controller'
import env from '../../config/env'
import { LogControllerDecorator } from '../../decorators/LogControllerDecorator'
import { makeLoginValidation } from './LoginValidationFactory'

export const makeLoginController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()

  const dbAuthentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
  const loginController = new LoginController(dbAuthentication, makeLoginValidation())

  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logMongoRepository)
}
