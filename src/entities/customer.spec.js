import { describe, test, expect, jest, beforeEach } from '@jest/globals'
import { CustomerEntity } from './customer.js'

const mockCustomerRepository = () => {
  class CustomerRepositoryStub {
    async create({ name, age }) {
      this.name = name
      this.age = age
    }
  }

  return new CustomerRepositoryStub()
}

describe('Customer Entity', () => {
  let customerRepository
  let sut = {}

  beforeEach(() => {
    customerRepository = mockCustomerRepository()
    sut = new CustomerEntity(customerRepository)
  })

  test('Should call customer repository with correct values', async () => {
    const cusomterSpy = jest.spyOn(
      customerRepository,
      customerRepository.create.name,
    )

    await sut.saveCustomer({ name: 'Jhon', age: 35 })

    expect(cusomterSpy).toHaveBeenCalledWith({ name: 'Jhon', age: 35 })
  })

  test('Should throws if no params are provided', async () => {
    const spy = sut.saveCustomer({})
    await expect(spy).rejects.toThrow('missing param: name/age')
  })

  test('Should throws if customer repository to throws', async () => {
    jest
      .spyOn(customerRepository, customerRepository.create.name)
      .mockImplementationOnce(() => Promise.reject(new Error()))

    const promise = sut.saveCustomer({ name: 'Jhon', age: 35 })

    await expect(promise).rejects.toThrow()
  })
})
