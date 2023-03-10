import {
  describe,
  test,
  expect,
  beforeEach,
  beforeAll,
  afterAll,
} from '@jest/globals'
import { MongoDBProvider } from '../../providers/mongodbProvider.js'
import { CustomerRepository } from './customerRepository.js'

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

  test('Should save a customer on success', async () => {
    const res = await sut.create({ name: 'Jhon Doe', age: 35 })

    const customer = await customerModel.findOne({ _id: res.insertedId })

    expect(customer.name).toBe('Jhon Doe')
    expect(customer.age).toBe(35)
  })
})
