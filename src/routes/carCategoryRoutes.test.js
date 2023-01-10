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
        .post('/category/create')
        .send({
          categoryName: 'Crew Cab Pickup',
          price: '150.90',
        })
        .expect(201)
    })
  })

  describe('GET /findAll', () => {
    test('Should return 200 when find all cars categories', async () => {
      await carCategoryModel.insertMany([
        {
          categoryName: 'SUV',
          price: '110.00',
        },
        {
          categoryName: 'Crew Cab Pickup',
          price: '150.90',
        },
      ])
      await request(app).get('/category/findAll').expect(200)
    })
  })

  describe('GET /findById/:carCategoryId', () => {
    test('Should return 200 when find a car category by id', async () => {
      const res = await carCategoryModel.insertMany([
        {
          categoryName: 'SUV',
          price: '110.00',
        },
        {
          categoryName: 'Crew Cab Pickup',
          price: '150.90',
        },
      ])
      const carCategoryId = res.insertedIds[0]
      await request(app).get(`/category/findById/${carCategoryId}`).expect(200)
    })
  })
})
