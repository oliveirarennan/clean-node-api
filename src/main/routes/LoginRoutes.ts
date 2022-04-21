import { Router } from 'express'
import { adaptRoute } from '../adapters/express/ExpressRouteAdapter'
import { makeSignUpController } from '../factories/controllers/Signup/SignupControllerFactory'
import { makeLoginController } from '../factories/controllers/Login/LoginControllerFactory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
