import { InvalidParamError } from '../../presentation/errors'
import { CompareFieldsValidation } from './CompareFieldsValidation'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'fieldToCompare')
}

describe('CompareFieldValidation', () => {
  it('Should Return a InvalidParamError if validation fails', () => {
    const sut = makeSut()

    const error = sut.validate({ field: 'any_value', fieldToCompare: 'wrong_value' })

    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  it('Should not Return if validation succeeds', () => {
    const sut = makeSut()

    const error = sut.validate({ field: 'any_value', fieldToCompare: 'any_value' })
    expect(error).toBeFalsy()
  })
})
