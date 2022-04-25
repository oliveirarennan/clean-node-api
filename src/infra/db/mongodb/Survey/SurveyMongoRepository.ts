import { MongoHelper } from '../helpers/MongoHelper'
import { AddSurveyRepository } from '../../../../data/interfaces/db/AddSurveyRepository/AddSurveyRepository'
import { AddSurveyModel } from '../../../../domain/usecases/AddSurvey'

export class SurveyMongoRepository implements AddSurveyRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = MongoHelper.getCollection('surveys')
    await (await surveyCollection).insertOne(surveyData)
  }
}
