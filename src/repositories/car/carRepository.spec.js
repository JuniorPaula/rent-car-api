import {
  describe,
  test,
  beforeEach,
  beforeAll,
  afterAll,
  expect,
} from '@jest/globals'
import { MongoDBProvider } from '../../providers/mongodbProvider.js'
import { CarRepository } from './carRepository.js'

describe('Car Repository', () => {
  let carCategoryModel
  let carModel
  let sut = {}

  beforeAll(async () => {
    await MongoDBProvider.connect(process.env.MONGO_URL)
    carModel = await MongoDBProvider.getCollection('cars')
    carCategoryModel = await MongoDBProvider.getCollection('car_categories')
  })

  beforeEach(async () => {
    sut = new CarRepository()
    await carModel.deleteMany()
    await carCategoryModel.deleteMany()
  })

  afterAll(async () => {
    await MongoDBProvider.disconnect()
  })

  describe('#Create a car', () => {
    test('Should save a car data on success', async () => {
      const res = await carCategoryModel.insertOne({
        categoryName: 'SUV',
        price: '110.00',
      })

      const carCategoryId = res.insertedId

      await sut.create({
        name: 'Taurus',
        releaseYear: '2023',
        available: true,
        carCategoryId,
      })
      const car = await carModel.findOne({ carCategoryId })

      expect(car.name).toBe('Taurus')
      expect(car.carCategoryId).toEqual(carCategoryId)
    })
  })

  describe('#Load cars', () => {
    test('Should return a list of cars when find method succeeds', async () => {
      await carModel.insertMany([
        {
          name: 'Taurus',
          releaseYear: 2022,
          available: true,
        },
        {
          name: 'Fiat Cronos',
          releaseYear: 2023,
          available: true,
        },
      ])

      const cars = await sut.find()

      expect(cars.length).toBeGreaterThan(1)
      expect(cars[0].name).toBe('Taurus')
      expect(cars[1].name).toBe('Fiat Cronos')
    })
  })
})
