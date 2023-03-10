import { describe, test, expect, beforeEach, jest } from '@jest/globals'
import { CarController } from './carController.js'

const mockCarEntity = () => {
  class CarEntityStub {
    async create({ name, releaseYear, available }) {
      this.name = name
      this.releaseYear = releaseYear
      this.available = available
    }
  }

  return new CarEntityStub()
}

describe('CarController', () => {
  let carEntityStub
  let sut = {}

  beforeEach(() => {
    carEntityStub = mockCarEntity()
    sut = new CarController(carEntityStub)
  })

  test('Should return 400 if name is not provided', async () => {
    const httpRequest = {
      body: {
        releaseYear: '2023',
        available: true,
        carCategoryId: '123-asdf-098',
      },
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.message).toBe('missing param: name')
  })

  test('Should return 400 if carCategoryId is not provided', async () => {
    const httpRequest = {
      body: {
        name: 'Taurus',
        releaseYear: '2023',
        available: true,
      },
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.message).toBe('missing param: carCategoryId')
  })

  test('Should return 400 if releaseYear is not provided', async () => {
    const httpRequest = {
      body: {
        name: 'Taurus',
        available: true,
        carCategoryId: '123-asdf-098',
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
        carCategoryId: '123-asdf-098',
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

  test('Should call CarEntity with correct values', async () => {
    const httpRequest = {
      body: {
        name: 'Taurus',
        releaseYear: '2023',
        available: true,
        carCategoryId: '123-asdf-098',
      },
    }

    const spy = jest.spyOn(carEntityStub, carEntityStub.create.name)

    await sut.handle(httpRequest)

    expect(spy).toHaveBeenCalledWith({
      name: 'Taurus',
      releaseYear: '2023',
      available: true,
      carCategoryId: '123-asdf-098',
    })
  })

  test('Should return 500 if CarEntity throws', async () => {
    const httpRequest = {
      body: {
        name: 'Taurus',
        releaseYear: '2023',
        available: true,
        carCategoryId: '123-asdf-098',
      },
    }

    class CarCategoryEntityStub {
      async create() {
        throw new Error()
      }
    }

    const carCategoryEntity = new CarCategoryEntityStub()
    const sut = new CarController(carCategoryEntity)

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.error.message).toBe('Internal server error')
  })

  test('Should return 201 if succeeds', async () => {
    const httpRequest = {
      body: {
        name: 'Taurus',
        releaseYear: '2023',
        available: true,
        carCategoryId: '123-asdf-098',
      },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body).toBe('created')
  })
})
