import { Authentication, AuthenticationModel } from '../../../domain/usecases/Authentication'
import { HashComparer } from '../../interfaces/criptography/HashComparer'
import { TokenGenerator } from '../../interfaces/criptography/TokenGenerator'
import { LoadAccountByEmailRepository } from '../../interfaces/db/LoadAccountByEmailRepository'
import { UpdateAccessTokenRepository } from '../../interfaces/db/UpdateAccessTokenRepository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator,
    private readonly updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)

    if (account) {
      const isValid = await this.hashComparer.comparer(authentication.password, account.password)

      if (isValid) {
        const accessToken = await this.tokenGenerator.generate(account.id)

        await this.updateAccessTokenRepositoryStub.update(account.id, accessToken)

        return accessToken
      }
    }

    return null
  }
}
