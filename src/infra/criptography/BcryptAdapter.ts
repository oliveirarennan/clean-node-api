import bcrypt from 'bcrypt'
import { Hasher } from '../../data/interfaces/criptography/Hasher'

export class BcryptAdapter implements Hasher {
  constructor (private readonly salt: number) {}
  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)

    return hash
  }
}
