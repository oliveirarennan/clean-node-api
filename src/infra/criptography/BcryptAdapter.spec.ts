import bcrypt from 'bcrypt'
import { BcryptAdapter } from './BcryptAdapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise<string>((resolve) => resolve('hashed_value'))
  }
}))

describe('Bcrypt Adapter', () => {
  it('Should Call Bcrypt with correct values', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')

    expect(hashSpy).toBeCalledWith('any_value', salt)
  })

  it('Should return a hash on success', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hash = await sut.encrypt('any_value')

    expect(hash).toBe('hashed_value')
  })
})
