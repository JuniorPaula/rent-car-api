import {
  describe,
  test,
  beforeEach,
  beforeAll,
  afterAll,
  expect,
} from '@jest/globals'
import { MongoDBProvider } from '../providers/mongodbProvider.js'
import { CarCategoryRepository } from './carCategoryRepository.js'

describe('CarCategory Repository', () => {
  let carCategoryModel
  let sut = {}

  beforeAll(async () => {
    await MongoDBProvider.connect(process.env.MONGO_URL)
    carCategoryModel = await MongoDBProvider.getCollection('car_categories')
  })

  beforeEach(async () => {
    sut = new CarCategoryRepository()
    await carCategoryModel.deleteMany()
  })

  afterAll(async () => {
    await MongoDBProvider.disconnect()
  })

  describe('#Save car category', () => {
    test('Should throws if no params are provided', async () => {
      await expect(sut.save({})).rejects.toThrow('missing param: categoryName')
      await expect(
        sut.save({ categoryName: 'Crew Cab Pickup' }),
      ).rejects.toThrow('missing param: price')
    })

    test('Should save a car category on success', async () => {
      const res = await sut.save({
        categoryName: 'Crew Cab Pickup',
        price: '150.90',
      })

      const carCategory = await carCategoryModel.findOne({
        _id: res.insertedId,
      })

      expect(carCategory.categoryName).toStrictEqual('Crew Cab Pickup')
      expect(carCategory.price).toStrictEqual('150.90')
    })
  })

  describe('FindAll car category', () => {
    test('Should return all cars categories on success', async () => {
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
      const carCategories = await sut.findAll()

      expect(carCategories[0].categoryName).toStrictEqual('SUV')
      expect(carCategories[1].categoryName).toStrictEqual('Crew Cab Pickup')
    })
  })
})
