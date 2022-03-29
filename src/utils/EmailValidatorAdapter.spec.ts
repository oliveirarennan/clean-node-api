import { EmailValidatorAdapter } from './EmailValidatorAdapter'

describe('Email Validator Adapter', () => {
  it('Should returns false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })
})
