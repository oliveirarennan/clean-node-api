import { InvalidParamError } from '../../errors'
import { EmailValidator } from '../../interfaces/EmailValidator'
import { Validation } from '../../interfaces/Validation'

export class EmailValidation implements Validation {
  constructor (private readonly fieldName: string, private readonly emailValidador: EmailValidator) {}
  validate (input: any): Error {
    const isValid = this.emailValidador.isValid(input[this.fieldName])

    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
