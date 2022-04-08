import { Validation, ValidationData } from './validation'

export class ValidationComposite implements Validation {
  constructor (private readonly validations: Validation[]) {}

  validate (input: ValidationData<any>): Error {
    for (const validation of this.validations) {
      const error = validation.validate(input)

      if (error) {
        return error
      }
    }
  }
}
