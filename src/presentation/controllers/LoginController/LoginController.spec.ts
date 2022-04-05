import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/HttpHelper'
import { LoginController } from './LoginController'

interface SutTypes {
  sut: LoginController
}

const makeSut = (): SutTypes => {
  const sut = new LoginController()

  return {
    sut
  }
}

describe('Login Controller', () => {
  it('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }

    const HttpResponse = await sut.handle(httpRequest)

    expect(HttpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  it('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        email: 'any_email@email.com'
      }
    }

    const HttpResponse = await sut.handle(httpRequest)

    expect(HttpResponse).toEqual(badRequest(new MissingParamError('password')))
  })
})
