import { hash } from 'bcrypt'
import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/MongoHelper'

import app from '../config/app'

let accountCollection: Collection

describe('Login Routes Middleware', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  describe('POST /signup', () => {
    it('Should return 200 on signup', async () => {
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
  describe('POST /login', () => {
    it('Should return 200 on login', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'Rennan',
        email: 'rennan.n.oliveira@gmail.com',
        password
      })

      await request(app)
        .post('/api/login')
        .send({
          email: 'rennan.n.oliveira@gmail.com',
          password: '123'
        })
        .expect(200)
    })

    it('Should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'rennan.n.oliveira@gmail.com',
          password: '123'
        })
        .expect(401)
    })
  })
})
