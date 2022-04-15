import { Router } from 'express'
import { adaptRoute } from '../adapters/ExpressRouteAdapter'
import { makeSignUpController } from '../factories/Signup/SignupFactory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
}
