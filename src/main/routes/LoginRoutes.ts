import { Router } from 'express'
import { adaptRoute } from '../adapters/express/ExpressRouteAdapter'
import { makeSignUpController } from '../factories/Signup/SignupFactory'
import { makeLoginController } from '../factories/Login/LoginFactory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
