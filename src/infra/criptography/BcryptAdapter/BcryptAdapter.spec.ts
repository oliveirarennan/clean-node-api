import bcrypt from 'bcrypt'
import { BcryptAdapter } from './BcryptAdapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise<string>((resolve) => resolve('hashed_value'))
  },
  async compare (): Promise<boolean> {
    return await new Promise<boolean>((resolve) => resolve(true))
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  describe('hash()', () => {
    it('Should Call hash with correct values', async () => {
      const sut = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash('any_value')

      expect(hashSpy).toBeCalledWith('any_value', salt)
    })

    it('Should return a  valid hash on hash success', async () => {
      const sut = makeSut()
      const hash = await sut.hash('any_value')

      expect(hash).toBe('hashed_value')
    })

    it('Should throw if hash  throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => { throw new Error() })
      const promise = sut.hash('any_value')

      await expect(promise).rejects.toThrow()
    })
  })

  describe('compare()', () => {
    it('Should Call compare with correct values', async () => {
      const sut = makeSut()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare('any_value', 'any_hash')

      expect(compareSpy).toBeCalledWith('any_value', 'any_hash')
    })

    it('Should return  true when compare succeeds', async () => {
      const sut = makeSut()
      const isValid = await sut.compare('any_value', 'any_hash')

      expect(isValid).toBe(true)
    })

    it('should return false if compare fails', async () => {
      const sut = makeSut()
      // @ts-expect-error
      jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(new Promise(resolve => resolve(false)))
      const isValid = await sut.compare('any_value', 'any_hash')
      expect(isValid).toBe(false)
    })

    it('Should throw if compare throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => { throw new Error() })
      const promise = sut.compare('any_value', 'any_hash')

      await expect(promise).rejects.toThrow()
    })
  })
})
