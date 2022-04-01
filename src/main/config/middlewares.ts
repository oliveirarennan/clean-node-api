import { Express } from 'express'
import { bodyParser } from '../middlewares/BodyParser'
import { cors } from '../middlewares/Cors'

export default (app: Express): void => {
  app.use(cors)
  app.use(bodyParser)
}
