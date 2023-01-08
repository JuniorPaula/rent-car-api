import { describe, test, beforeEach, expect } from '@jest/globals'
import { CarCategory } from './carCategory.js'

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
