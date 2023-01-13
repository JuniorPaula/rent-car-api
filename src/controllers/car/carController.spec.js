import { describe, test, expect, beforeEach } from '@jest/globals'
import { CarController } from './carController.js'

describe('CarController', () => {
  let sut = {}

  beforeEach(() => {
    sut = new CarController()
  })

  test('Should return 400 if name is not provided', async () => {
    const httpRequest = {
      body: {
        releaseYear: '2023',
        available: true,
      },
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.message).toBe('missing param: name')
  })

  test('Should return 400 if releaseYear is not provided', async () => {
    const httpRequest = {
      body: {
        name: 'Taurus',
        available: true,
      },
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.message).toBe('missing param: releaseYear')
  })
})
