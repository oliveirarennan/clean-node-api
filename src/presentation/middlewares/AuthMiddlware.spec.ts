// import { HttpRequest } from '../interfaces'
import { forbidden } from '../helpers/http/HttpHelper'
import { AccessDeniedError } from '../errors'
import { AuthMiddleware } from './AuthMiddleware'

describe('Auth Middleware', () => {
  it('Should return 403 if no x-access-token is provided', async () => {
    const sut = new AuthMiddleware()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
