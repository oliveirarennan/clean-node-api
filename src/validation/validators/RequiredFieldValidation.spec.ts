import { MissingParamError } from '../../presentation/errors'
import { RequiredFieldValidation } from './RequiredFieldValidation'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('field')
}

describe('RequiredFieldValidation', () => {
  it('Should Return a MissingParamError if validation fails', () => {
    const sut = makeSut()

    const error = sut.validate({ name: 'any_name' })

    expect(error).toEqual(new MissingParamError('field'))
  })

  it('Should not Return if validation succeeds', () => {
    const sut = makeSut()

    const error = sut.validate({ field: 'any_name' })

    expect(error).toBeFalsy()
  })
})
