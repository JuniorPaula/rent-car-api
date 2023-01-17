import { describe, test, beforeEach, beforeAll, afterAll } from '@jest/globals'
import { MongoDBProvider } from '../providers/mongodbProvider.js'

import request from 'supertest'
import app from '../main/app.js'

describe('Car Routes', () => {
  let carCategoryModel
  let carModel

  beforeAll(async () => {
    await MongoDBProvider.connect(process.env.MONGO_URL)
    carCategoryModel = await MongoDBProvider.getCollection('car_categories')
    carModel = await MongoDBProvider.getCollection('cars')
  })

  beforeEach(async () => {
    await carCategoryModel.deleteMany()
    await carModel.deleteMany()
  })

  afterAll(async () => {
    await MongoDBProvider.disconnect()
  })

  describe('POST /rent', () => {
    test('Should return 200 if succeeds', async () => {
      const res = await carCategoryModel.insertOne({
        categoryName: 'SUV',
        price: '110.00',
      })

      const carCategoryId = res.insertedId

      await carModel.insertMany([
        {
          name: 'Taurus',
          releaseYear: '2023',
          available: true,
          carCategoryId,
        },
        {
          name: 'Fiat Cronos',
          releaseYear: 2023,
          available: true,
          carCategoryId,
        },
      ])

      await request(app)
        .post('/rent')
        .send({
          customerName: 'Jane Doe',
          customerAge: 34,
          carCategoryId,
          numberOfDays: 3,
        })
        .expect(200)
    })
  })
})
