import { EmailValidatorAdapter } from './EmailValidatorAdapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail: (): boolean => {
    return true
  }
}))

describe('Email Validator Adapter', () => {
  it('Should returns false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })

  it('Should returns true if validator returns true', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('valid_email@mail.com')
    expect(isValid).toBe(true)
  })
})
