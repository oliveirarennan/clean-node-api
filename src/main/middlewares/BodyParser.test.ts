import request from 'supertest'

import app from '../config/app'

describe('Body Parser Middleware', () => {
  it('Should parse json body as json', async () => {
    app.post('/test_body_parser', (request, response) => {
      response.send(request.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Rennan' })
      .expect({ name: 'Rennan' })
  })
})
