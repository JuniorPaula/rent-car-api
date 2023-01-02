import { describe, test, expect, jest } from '@jest/globals'
import { CustomerEntity } from './customer.js'

describe('Customer Entity', () => {
  test('Should call customer repository with correct values', async () => {
    class CustomerRepository {
      async create({ name, age }) {
        this.name = name
        this.age = age
      }
    }

    const customerRepository = new CustomerRepository()
    const sut = new CustomerEntity(customerRepository)

    const cusomterSpy = jest.spyOn(
      customerRepository,
      customerRepository.create.name,
    )

    await sut.saveCustomer({ name: 'Jhon', age: 35 })

    expect(cusomterSpy).toHaveBeenCalledWith({ name: 'Jhon', age: 35 })
  })
})
