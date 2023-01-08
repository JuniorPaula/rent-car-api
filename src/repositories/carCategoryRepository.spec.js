import {
  describe,
  test,
  beforeEach,
  beforeAll,
  afterAll,
  expect,
} from '@jest/globals'
import { MongoDBProvider } from '../providers/mongodbProvider.js'
import { MissingParamError } from '../validations/errors/index.js'

class CarCategoryRepository {
  async save({ categoryName, price }) {
    if (!categoryName) {
      throw new MissingParamError('categoryName')
    }
    if (!price) {
      throw new MissingParamError('price')
    }
  }
}

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

  test('Should throws if no params are provided', async () => {
    await expect(sut.save({})).rejects.toThrow('missing param: categoryName')
    await expect(sut.save({ categoryName: 'Crew Cab Pickup' })).rejects.toThrow(
      'missing param: price',
    )
  })
})
