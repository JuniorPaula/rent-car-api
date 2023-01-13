import { describe, test, beforeEach, expect, jest } from '@jest/globals'
import { CustomerController } from './customerController.js'

const mockCustomerEntity = () => {
  class CustomerEntityStub {
    async saveCustomer({ name, age }) {
      this.name = name
      this.age = age
    }
  }

  return new CustomerEntityStub()
}

describe('Customer controller', () => {
  let customerEntityStub = mockCustomerEntity()
  let sut = {}

  beforeEach(() => {
    sut = new CustomerController(customerEntityStub)
  })

  test('should return 400 if no name is provided', async () => {
    const httpRequest = {
      body: {
        age: 25,
      },
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.message).toBe('missing param: name')
  })

  test('should return 400 if no age is provided', async () => {
    const httpRequest = {
      body: {
        name: 'Jhon Doe',
      },
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.message).toBe('missing param: age')
  })

  test('should return 500 if no httpRequest is provided', async () => {
    const httpResponse = await sut.handle()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.error.message).toBe('Internal server error')
  })

  test('should return 500 if httpRequest has no body', async () => {
    const httpRequest = {}
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.error.message).toBe('Internal server error')
  })

  test('should call CustomerEntity with correct values', async () => {
    const httpRequest = {
      body: {
        name: 'Jhon Doe',
        age: 25,
      },
    }
    const customerEntitySpy = jest.spyOn(
      customerEntityStub,
      customerEntityStub.saveCustomer.name,
    )
    await sut.handle(httpRequest)
    expect(customerEntitySpy).toHaveBeenCalledWith({
      name: 'Jhon Doe',
      age: 25,
    })
    expect(customerEntitySpy).toHaveBeenCalledTimes(1)
  })

  test('should return 500 if CustomerEntity to throws', async () => {
    const httpRequest = {
      body: {
        name: 'Jhon Doe',
        age: 25,
      },
    }

    class CustomerEntityStub {
      async saveCustomer() {
        throw new Error()
      }
    }

    const customerEntityStub = new CustomerEntityStub()
    const sut = new CustomerController(customerEntityStub)

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.error.message).toBe('Internal server error')
  })

  test('should return 201 if succeeds', async () => {
    const httpRequest = {
      body: {
        name: 'Jhon Doe',
        age: 25,
      },
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body).toBe('created')
  })
})
