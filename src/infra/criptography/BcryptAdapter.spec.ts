import bcrypt from 'bcrypt'
import { BcryptAdapter } from './BcryptAdapter'

describe('Bcrypt Adapter', () => {
  it('Should Call Bcrypt with correct values', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')

    expect(hashSpy).toBeCalledWith('any_value', salt)
  })
})