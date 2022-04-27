import { Router } from 'express'
import { adaptRoute } from '../adapters/ExpressRouteAdapter'
import { makeSignUpController } from '../factories/controllers/Login/Signup/SignupControllerFactory'
import { makeLoginController } from '../factories/controllers/Login/Login/LoginControllerFactory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
