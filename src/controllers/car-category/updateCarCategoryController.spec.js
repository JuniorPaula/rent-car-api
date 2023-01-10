import { describe, test, expect, beforeEach, jest } from '@jest/globals'
import { UpdateCarCategoryController } from './updateCarCategoryController.js'

const mockCarCategoryEntityStub = () => {
  class CarCategoryEntityStub {
    async update({ carCategoryId, categoryName, price }) {
      this.carCategoryId = carCategoryId
      this.categoryName = categoryName
      this.price = price
    }
  }

  return new CarCategoryEntityStub()
}

describe('UpdateCarCategoryController', () => {
  let carCategoryEntityStub
  let sut = {}

  beforeEach(() => {
    carCategoryEntityStub = mockCarCategoryEntityStub()
    sut = new UpdateCarCategoryController(carCategoryEntityStub)
  })

  test('Should return 500 if no httpRequest is provided', async () => {
    const httpResponse = await sut.handle()

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.error.message).toBe('Internal server error')
  })

  test('Should return 500 if httpRequest has no params', async () => {
    const httpRequest = {}
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.error.message).toBe('Internal server error')
  })

  test('Should return 500 if httpRequest has no body', async () => {
    const httpRequest = {
      params: {
        carCategoryId: '123-asdf-098',
      },
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.error.message).toBe('Internal server error')
  })

  test('Should call CarCategoryEntity with correct param', async () => {
    const httpRequest = {
      params: {
        carCategoryId: '123-asdf-098',
      },
      body: {
        categoryName: 'Crew Cab Pickup updated',
        price: '170.90',
      },
    }
    const getSpy = jest.spyOn(
      carCategoryEntityStub,
      carCategoryEntityStub.update.name,
    )
    await sut.handle(httpRequest)

    expect(getSpy).toHaveBeenCalledWith({
      carCategoryId: '123-asdf-098',
      categoryName: 'Crew Cab Pickup updated',
      price: '170.90',
    })
    expect(getSpy).toHaveBeenCalledTimes(1)
  })

  test('Should return 500 if CarCategoryEntity throws', async () => {
    const httpRequest = {
      params: {
        carCategoryId: '123-asdf-098',
      },
      body: {
        categoryName: 'Crew Cab Pickup updated',
        price: '170.90',
      },
    }
    class CarCategoryEntityStub {
      async update() {
        throw new Error()
      }
    }
    const carCategoryEntity = new CarCategoryEntityStub()
    const sut = new UpdateCarCategoryController(carCategoryEntity)

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.error.message).toBe('Internal server error')
  })
})
