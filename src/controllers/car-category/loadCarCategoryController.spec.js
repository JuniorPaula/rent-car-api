import { describe, test, expect, beforeEach, jest } from '@jest/globals'
import { LoadCarCategoryController } from './loadCarCategoryController.js'

const mockCarCategoryEntityStub = () => {
  class CarCategoryEntityStub {
    async getCarCategory({ carCategoryId = null }) {
      this.carCategoryId = carCategoryId
    }
  }

  return new CarCategoryEntityStub()
}

describe('LoadCarCategoryController', () => {
  let carCategoryEntityStub = mockCarCategoryEntityStub()
  let sut = {}

  beforeEach(() => {
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
})
