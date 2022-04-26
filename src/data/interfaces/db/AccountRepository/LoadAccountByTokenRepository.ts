import { AccountModel } from '../../../usecases/AddAccount/DbAddAccountInterfaces'

export interface LoadAccountByTokenRepository{
  loadByToken: (token: string, role?: string) => Promise<AccountModel>
}
