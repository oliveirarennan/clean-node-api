import { Authentication, AuthenticationModel } from '../../../domain/usecases/Authentication'
import { LoadAccountByEmailRepository } from '../../interfaces/db/LoadAccountByEmailRepository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    await this.loadAccountByEmailRepository.load(authentication.email)
    return null
  }
}
