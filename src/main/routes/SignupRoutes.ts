import { Router } from 'express'
import { adaptRoute } from '../adapters/express/ExpressRouteAdapter'
import { makeSignUpController } from '../factories/Signup/SignupFactory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
}
