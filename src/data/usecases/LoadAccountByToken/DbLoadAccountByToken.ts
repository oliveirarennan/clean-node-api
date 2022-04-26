import { LoadAccountByToken } from '../../../domain/usecases/LoadAccountByToken'
import { AccountModel } from '../../../domain/models/Account'
import { Decrypter } from '../../interfaces/criptography/Decrypter'
import { LoadAccountByTokenRepository } from '../../interfaces/db/AccountRepository/LoadAccountByTokenRepository'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    const token = await this.decrypter.decrypt(accessToken)

    if (token) {
      await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
    }
    return await new Promise(resolve => resolve(null))
  }
}
