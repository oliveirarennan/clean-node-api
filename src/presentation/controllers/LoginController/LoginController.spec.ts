import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/HttpHelper'
import { LoginController } from './LoginController'

describe('Login Controller', () => {
  it('Should return 400 if no email is provided', async () => {
    const sut = new LoginController()

    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }

    const HttpResponse = await sut.handle(httpRequest)

    expect(HttpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  it('Should return 400 if no password is provided', async () => {
    const sut = new LoginController()

    const httpRequest = {
      body: {
        email: 'any_email@email.com'
      }
    }

    const HttpResponse = await sut.handle(httpRequest)

    expect(HttpResponse).toEqual(badRequest(new MissingParamError('password')))
  })
})
