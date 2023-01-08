import { describe, test, beforeEach, expect } from '@jest/globals'
import { CarCategoryController } from './carCategoryController.js'

describe('CarCategory', () => {
  let sut = {}

  beforeEach(() => {
    sut = new CarCategoryController()
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

  test('Should return 500 if no httpRequest is provided', async () => {
    const httpResponse = await sut.handle()

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.error.message).toBe('Internal server error')
  })
})
