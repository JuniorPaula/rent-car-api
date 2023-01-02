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
  let customerRepository = mockCustomerRepository()
  let sut = {}

  beforeEach(() => {
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
})
