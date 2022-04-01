import { Express } from 'express'
import { bodyParser, ContentType, Cors } from '../middlewares'

export default (app: Express): void => {
  app.use(Cors)
  app.use(bodyParser)
  app.use(ContentType)
}
