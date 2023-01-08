import { describe, test, beforeEach, expect, jest } from '@jest/globals'
import { CarCategoryController } from './carCategoryController.js'

const mockCarCategoryEntityStub = () => {
  class CarCategoryEntityStub {
    async create({ categoryName, price }) {
      this.categoryName = categoryName
      this.price = price
    }
  }

  return new CarCategoryEntityStub()
}

describe('CarCategory', () => {
  let carCategoryEntityStub = mockCarCategoryEntityStub()
  let sut = {}

  beforeEach(() => {
    sut = new CarCategoryController(carCategoryEntityStub)
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

  test('Should return 500 if httpRequest has no body', async () => {
    const httpRequest = {}
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.error.message).toBe('Internal server error')
  })

  test('Should call CarCategoryEntity with correct values', async () => {
    const httpRequest = {
      body: {
        categoryName: 'Crew Cab Pickup',
        price: '150.90',
      },
    }
    const carCategorySpy = jest.spyOn(
      carCategoryEntityStub,
      carCategoryEntityStub.create.name,
    )

    await sut.handle(httpRequest)

    expect(carCategorySpy).toHaveBeenCalledWith({
      categoryName: 'Crew Cab Pickup',
      price: '150.90',
    })
    expect(carCategorySpy).toHaveBeenCalledTimes(1)
  })

  test('Should return 500 if CarCategoryEntity throws', async () => {
    const httpRequest = {
      body: {
        categoryName: 'Crew Cab Pickup',
        price: '150.90',
      },
    }
    class CarCategoryEntityStub {
      async create() {
        throw new Error()
      }
    }
    const carCategoryEntity = new CarCategoryEntityStub()
    const sut = new CarCategoryController(carCategoryEntity)

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.error.message).toBe('Internal server error')
  })

  test('should return 201 if succeeds', async () => {
    const httpRequest = {
      body: {
        categoryName: 'Crew Cab Pickup',
        price: '150.90',
      },
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body).toBe('no content')
  })
})
