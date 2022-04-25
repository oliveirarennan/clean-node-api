import { RequiredFieldValidation, ValidationComposite } from '../../../../validation/validators'
import { Validation } from '../../../../presentation/interfaces'
import { makeAddSurveyValidation } from './AddSurveyValidationFactory'

jest.mock('../../../../validation/validators/ValidationComposite')

describe('AddSurveyValidation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation()

    const validations: Validation[] = []

    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposite).toBeCalledWith(validations)
  })
})
