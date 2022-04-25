import { DbAddSurvey } from '../../../../data/usecases/AddSurvey/DBAddSurvey'
import { AddSurvey } from '../../../../domain/usecases/AddSurvey'
import { SurveyMongoRepository } from '../../../../infra/db/mongodb/Survey/SurveyMongoRepository'

export const makeDbAddSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbAddSurvey(surveyMongoRepository)
}
