import { describe, test, beforeEach, expect } from '@jest/globals'
import { CustomerController } from './customerController.js'

describe('Customer controller', () => {
  let sut = {}

  beforeEach(() => {
    sut = new CustomerController()
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
})
