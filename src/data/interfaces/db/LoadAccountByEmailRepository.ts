import { AccountModel } from '../../usecases/AddAccount/DbAddAccountInterfaces'

export interface LoadAccountByEmailRepository{
  loadByEmail: (email: string) => Promise<AccountModel>
}
