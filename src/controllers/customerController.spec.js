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
    expect(httpResponse.error).toBe('missing param: name')
  })
})