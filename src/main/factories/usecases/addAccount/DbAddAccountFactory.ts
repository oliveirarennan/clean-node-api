import { DbAddAccount } from '../../../../data/usecases/AddAccount/DbAddAccount'
import { AddAccount } from '../../../../domain/usecases/AddAccount'
import { BcryptAdapter } from '../../../../infra/criptography/BcryptAdapter/BcryptAdapter'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/AccountRepository/AccountRepository'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(bcryptAdapter, accountMongoRepository)
}
