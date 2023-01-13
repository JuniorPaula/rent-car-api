import { describe, test, expect } from '@jest/globals'
import { CarController } from './carController.js'

describe('CarController', () => {
  test('Should return 400 if name is not provided', async () => {
    const httpRequest = {
      body: {
        releaseYear: '2023',
        available: true,
      },
    }
    const sut = new CarController()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.message).toBe('missing param: name')
  })
})
