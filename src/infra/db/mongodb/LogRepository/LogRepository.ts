import { LogErrorRepository } from '../../../../data/interfaces/db/LogRepository/LogErrorRepository'
import { MongoHelper } from '../helpers/MongoHelper'

export class LogMongoRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
