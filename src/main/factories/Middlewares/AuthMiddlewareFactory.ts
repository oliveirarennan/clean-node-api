import { Middleware } from '../../../presentation/interfaces'
import { AuthMiddleware } from '../../../presentation/middlewares/AuthMiddleware'
import { makeDbLoadAccountByToken } from '../usecases/Account/loadAccountByToken/DbLoadAccountByTokenFactory'

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}
