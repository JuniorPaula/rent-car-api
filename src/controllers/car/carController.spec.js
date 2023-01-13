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

  test('Should return 400 if available is not provided', async () => {
    const httpRequest = {
      body: {
        name: 'Taurus',
        releaseYear: '2023',
      },
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.message).toBe('missing param: available')
  })

  test('Should return 500 if no httpRequest is provided', async () => {
    const httpResponse = await sut.handle()

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.error.message).toBe('Internal server error')
  })

  test('Should return 500 if httpRequest has no body', async () => {
    const httpRequest = {}
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.error.message).toBe('Internal server error')
  })
})
