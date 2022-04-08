
import { RequiredFieldValidation } from '../../presentation/helpers/validators/RequiredFieldValidation'
import { ValidationComposite } from '../../presentation/helpers/validators/ValidationComposite'
import { Validation } from '../../presentation/interfaces'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
