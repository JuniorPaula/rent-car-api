import { describe, test, expect } from '@jest/globals'
import { RentCarController } from './rentCarController.js'

describe('RentCarController', () => {
  test('Should return 400 if no customerName is provided', async () => {
    const httpRequest = {
      body: {
        customerAge: 34,
        carCategoryId: '123-asdf-098',
        numberOfDays: 3,
      },
    }

    const sut = new RentCarController()
    const httpResponse = await sut.hanlde(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.message).toBe('missing param: customerName')
  })
})
