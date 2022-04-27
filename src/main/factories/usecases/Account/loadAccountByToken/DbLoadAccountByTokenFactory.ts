import { DbLoadAccountByToken } from '../../../../../data/usecases/LoadAccountByToken/DbLoadAccountByToken'
import { LoadAccountByToken } from '../../../../../domain/usecases/LoadAccountByToken'
import { JwtAdapter } from '../../../../../infra/criptography/JwtAdapter/JwtAdapter'
import { AccountMongoRepository } from '../../../../../infra/db/mongodb/AccountRepository/AccountRepository'
import env from '../../../../config/env'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
