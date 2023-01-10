import { describe, test, expect, beforeEach, jest } from '@jest/globals'
import { LoadCarCategoryController } from './loadCarCategoryController.js'

const carCategoryDB = [
  {
    _id: '123-asdf-098',
    categoryName: 'SUV',
    price: '110.00',
  },
  {
    _id: '321-asdf-089',
    categoryName: 'Crew Cab Pickup',
    price: '150.90',
  },
]

const mockCarCategoryEntityStub = () => {
  class CarCategoryEntityStub {
    async getCarCategory({ carCategoryId = null }) {
      if (!carCategoryId) {
        return Promise.resolve(carCategoryDB)
      }

      const carCategories = carCategoryDB.find(
        (categoryId) => categoryId === carCategoryId,
      )

      return Promise.resolve(carCategories)
    }
  }

  return new CarCategoryEntityStub()
}

describe('LoadCarCategoryController', () => {
  let carCategoryEntityStub
  let sut = {}

  beforeEach(() => {
    carCategoryEntityStub = mockCarCategoryEntityStub()
    sut = new LoadCarCategoryController(carCategoryEntityStub)
  })

  test('Should return 500 if no httpRequest is provided', async () => {
    const httpResponse = await sut.handle()

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.error.message).toBe('Internal server error')
  })

  test('Should call CarCategoryEntity with correct param', async () => {
    const httpRequest = {
      params: {
        carCategoryId: '123-asdf-098',
      },
    }
    const getSpy = jest.spyOn(
      carCategoryEntityStub,
      carCategoryEntityStub.getCarCategory.name,
    )
    await sut.handle(httpRequest)

    expect(getSpy).toHaveBeenCalledWith({ carCategoryId: '123-asdf-098' })
    expect(getSpy).toHaveBeenCalledTimes(1)
  })

  test('When CarCategoryEntity to called without param, getCarCategory should it called to be null', async () => {
    const httpRequest = {}

    const getSpy = jest.spyOn(
      carCategoryEntityStub,
      carCategoryEntityStub.getCarCategory.name,
    )
    await sut.handle(httpRequest)

    expect(getSpy).toHaveBeenCalledWith({ carCategoryId: null })
    expect(getSpy).toHaveBeenCalledTimes(1)
  })

  test('Should return 500 if CarCategoryEntity throws', async () => {
    const httpRequest = {}
    class CarCategoryEntityStub {
      async getCarCategory() {
        throw new Error()
      }
    }
    const carCategoryEntity = new CarCategoryEntityStub()
    const sut = new LoadCarCategoryController(carCategoryEntity)

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.error.message).toBe('Internal server error')
  })

  test('should return all car categories if no param are provided', async () => {
    const httpRequest = {}
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual([
      {
        _id: '123-asdf-098',
        categoryName: 'SUV',
        price: '110.00',
      },
      {
        _id: '321-asdf-089',
        categoryName: 'Crew Cab Pickup',
        price: '150.90',
      },
    ])
  })
})
