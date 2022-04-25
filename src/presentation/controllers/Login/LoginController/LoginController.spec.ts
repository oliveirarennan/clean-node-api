import { MissingParamError } from '../../../errors'
import { badRequest, ok, serverError, unauthorized } from '../../../helpers/http/HttpHelper'
import { HttpRequest, Authentication, Validation, AuthenticationModel } from './LoginControllerInterfaces'
import { LoginController } from './LoginController'

interface SutTypes {
  sut: LoginController
  authenticationStub: Authentication
  validationStub: Validation
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@email.com',
    password: 'any_password'
  }
})

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: AuthenticationModel): Promise<string> {
      return 'any_token'
    }
  }

  return new AuthenticationStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }

  return new ValidationStub()
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const authenticationStub = makeAuthentication()
  const sut = new LoginController(authenticationStub, validationStub)

  return {
    sut,
    authenticationStub,
    validationStub
  }
}

describe('Login Controller', () => {
  it('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')

    await sut.handle(makeFakeRequest())

    expect(authSpy).toHaveBeenCalledWith({ email: 'any_email@email.com', password: 'any_password' })
  })

  it('Should returns 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise(resolve => resolve(null)))

    const httpRequest = await sut.handle(makeFakeRequest())

    expect(httpRequest).toEqual(unauthorized())
  })

  it('Should returns 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest = await sut.handle(makeFakeRequest())

    expect(httpRequest).toEqual(serverError(new Error()))
  })

  it('Should returns 200 if valid credentials are provide', async () => {
    const { sut } = makeSut()

    const httpRequest = await sut.handle(makeFakeRequest())

    expect(httpRequest).toEqual(ok({ accessToken: 'any_token' }))
  })

  it('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()

    const validateSpy = jest.spyOn(validationStub, 'validate')

    const httpRequest = makeFakeRequest()

    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  it('Should return 400 if Validation data return an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
