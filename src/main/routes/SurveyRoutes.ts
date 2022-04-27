import { Router } from 'express'
import { adaptRoute } from '../adapters/ExpressRouteAdapter'
import { makeAddSurveyController } from '../factories/controllers/Survey/AddSurvey/AddSurveyControllerFactory'

export default (router: Router): void => {
  router.post('/surveys', adaptRoute(makeAddSurveyController()))
}
