import { RequiredFieldValidation } from '../../presentation/helpers/validators/RequiredFieldValidation'
import { ValidationComposite } from '../../presentation/helpers/validators/ValidationComposite'
import { Validation } from '../../presentation/interfaces'
import { makeSignUpValidation } from './SignupValidation'

jest.mock('../../presentation/helpers/validators/ValidationComposite')

const validations: Validation[] = []

for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
  validations.push(new RequiredFieldValidation(field))
}

describe('SignUpValidation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()

    expect(ValidationComposite).toBeCalledWith(validations)
  })
})
