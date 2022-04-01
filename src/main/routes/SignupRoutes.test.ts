import request from 'supertest'

import app from '../config/app'

describe('SignUp Routes Middleware', () => {
  it('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Rennan',
        email: 'rennan.n.oliveira@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
