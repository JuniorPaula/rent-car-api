import {
  describe,
  test,
  expect,
  beforeEach,
  beforeAll,
  afterAll,
} from '@jest/globals'
import { MongoDBProvider } from '../providers/mongodbProvider'
import { MissingParamError } from '../validations/errors/index.js'

class CustomerRepository {
  async create({ name, age }) {
    if (!name) {
      throw new MissingParamError('name')
    }
    if (!age) {
      throw new MissingParamError('age')
    }
  }
}

describe('Customer Repository', () => {
  let customerModel
  let sut

  beforeAll(async () => {
    await MongoDBProvider.connect(process.env.MONGO_URL)
    customerModel = await MongoDBProvider.getCollection('customers')
  })

  beforeEach(async () => {
    sut = new CustomerRepository()
    await customerModel.deleteMany()
  })

  afterAll(async () => {
    await MongoDBProvider.disconnect()
  })

  test('Should throw if no params are provided', async () => {
    await expect(sut.create({})).rejects.toThrow('missing param: name')
    await expect(sut.create({ name: 'Jhon' })).rejects.toThrow(
      'missing param: age',
    )
  })
})
