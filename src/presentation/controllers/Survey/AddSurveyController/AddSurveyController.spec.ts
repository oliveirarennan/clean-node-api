import { HttpRequest, Validation } from './AddSurveyControllerInterfaces'
import { AddSurveyController } from './AddSurveyController'
import { ValidationData } from '../../../interfaces'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }]
  }
})

describe('AddSurveyController', () => {
  it('Should call Validation with correct values', async () => {
    class ValidationStub implements Validation {
      validate (input: ValidationData<any>): Error {
        return null
      }
    }

    const validationStub = new ValidationStub()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const sut = new AddSurveyController(validationStub)
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
