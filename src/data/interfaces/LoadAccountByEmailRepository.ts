import { AccountModel } from '../usecases/AddAccount/DbAddAccountInterfaces'

export interface LoadAccountByEmailRepository{
  load: (email: string) => Promise<AccountModel>
}
