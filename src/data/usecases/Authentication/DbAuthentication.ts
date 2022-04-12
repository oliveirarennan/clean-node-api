import { Authentication, AuthenticationModel } from '../../../domain/usecases/Authentication'
import { HashComparer } from '../../interfaces/criptography/HashComparer'
import { LoadAccountByEmailRepository } from '../../interfaces/db/LoadAccountByEmailRepository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)

    if (account) {
      await this.hashComparer.comparer(authentication.password, account.password)
    }

    return null
  }
}
