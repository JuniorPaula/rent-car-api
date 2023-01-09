import { describe, test, beforeEach, beforeAll, afterAll } from '@jest/globals'
import { MongoDBProvider } from '../providers/mongodbProvider.js'

import request from 'supertest'
import app from '../main/app.js'

describe('CarCategory Routes', () => {
  let carCategoryModel

  beforeAll(async () => {
    await MongoDBProvider.connect(process.env.MONGO_URL)
    carCategoryModel = await MongoDBProvider.getCollection('car_categories')
  })

  beforeEach(async () => {
    await carCategoryModel.deleteMany()
  })

  afterAll(async () => {
    await MongoDBProvider.disconnect()
  })

  describe('POST /create', () => {
    test('Should return 201 when created succeeds', async () => {
      await request(app)
        .post('/create')
        .send({
          categoryName: 'Crew Cab Pickup',
          price: '150.90',
        })
        .expect(201)
    })
  })
})
