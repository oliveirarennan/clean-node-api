import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/MongoHelper'

import app from '../config/app'

describe('SignUp Routes Middleware', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await (await accountCollection).deleteMany({})
  })

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
