import { describe, test, beforeEach, expect } from '@jest/globals'

class CarCategory {
  async handle(httpRequest) {
    if (!httpRequest.body.categoryName) {
      return {
        statusCode: 400,
        error: new Error('missing param: categoryName'),
      }
    }

    if (!httpRequest.body.price) {
      return {
        statusCode: 400,
        error: new Error('missing param: price'),
      }
    }
  }
}

describe('CarCategory', () => {
  let sut = {}

  beforeEach(() => {
    sut = new CarCategory()
  })

  test('Should return 400 if no categoryName is provided', async () => {
    const httpRequest = {
      body: {
        price: '150.90',
      },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.message).toBe('missing param: categoryName')
  })

  test('Should return 400 if no price is provided', async () => {
    const httpRequest = {
      body: {
        categoryName: 'Crew Cab Pickup',
      },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.message).toBe('missing param: price')
  })
})
