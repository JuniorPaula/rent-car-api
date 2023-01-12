import { describe, test, expect, beforeEach, jest } from '@jest/globals'
import { DeleteCarCategoryController } from './deleteCarCategoryController.js'

const mockCarCategoryEntityStub = () => {
  class CarCategoryEntityStub {
    async delete({ carCategoryId }) {
      this.carCategoryId = carCategoryId
    }
  }

  return new CarCategoryEntityStub()
}

describe('DeleteCarCategoryController', () => {
  let carCategoryEntityStub
  let sut = {}

  beforeEach(() => {
    carCategoryEntityStub = mockCarCategoryEntityStub()
    sut = new DeleteCarCategoryController(carCategoryEntityStub)
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
      carCategoryEntityStub.delete.name,
    )
    await sut.handle(httpRequest)

    expect(getSpy).toHaveBeenCalledWith({ carCategoryId: '123-asdf-098' })
    expect(getSpy).toHaveBeenCalledTimes(1)
  })

  test('Should return 500 if CarCategoryEntity throws', async () => {
    const httpRequest = {
      params: {
        carCategoryId: '123-asdf-098',
      },
    }

    class CarCategoryEntityStub {
      async delete() {
        throw new Error()
      }
    }
    const carCategoryEntity = new CarCategoryEntityStub()
    const sut = new DeleteCarCategoryController(carCategoryEntity)

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.error.message).toBe('Internal server error')
  })
})
