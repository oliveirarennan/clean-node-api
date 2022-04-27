import { Router } from 'express'
import { adaptMiddleware } from '../adapters/ExpressMiddlewareAdapter'
import { adaptRoute } from '../adapters/ExpressRouteAdapter'
import { makeAddSurveyController } from '../factories/controllers/Survey/AddSurvey/AddSurveyControllerFactory'
import { makeAuthMiddleware } from '../factories/Middlewares/AuthMiddlewareFactory'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
}
