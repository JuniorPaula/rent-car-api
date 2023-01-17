import { describe, test, expect, beforeEach } from '@jest/globals'
import { RentCarController } from './rentCarController.js'

describe('RentCarController', () => {
  let sut = {}

  beforeEach(() => {
    sut = new RentCarController()
  })

  test('Should return 400 if no customerName is provided', async () => {
    const httpRequest = {
      body: {
        customerAge: 34,
        carCategoryId: '123-asdf-098',
        numberOfDays: 3,
      },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.message).toBe('missing param: customerName')
  })

  test('Should return 400 if no customerAge is provided', async () => {
    const httpRequest = {
      body: {
        customerName: 'Jane Doe',
        carCategoryId: '123-asdf-098',
        numberOfDays: 3,
      },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.message).toBe('missing param: customerAge')
  })

  test('Should return 400 if no carCategoryId is provided', async () => {
    const httpRequest = {
      body: {
        customerName: 'Jane Doe',
        customerAge: 34,
        numberOfDays: 3,
      },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.message).toBe('missing param: carCategoryId')
  })

  test('Should return 400 if no numberOfDays is provided', async () => {
    const httpRequest = {
      body: {
        customerName: 'Jane Doe',
        customerAge: 34,
        carCategoryId: '123-asdf-098',
      },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.message).toBe('missing param: numberOfDays')
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
