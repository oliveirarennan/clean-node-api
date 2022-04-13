import bcrypt from 'bcrypt'
import { HashComparer } from '../../../data/interfaces/criptography/HashComparer'
import { Hasher } from '../../../data/interfaces/criptography/Hasher'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor (private readonly salt: number) {}

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)

    return hash
  }

  async compare (valeu: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(valeu, hash)
    return isValid
  }
}
