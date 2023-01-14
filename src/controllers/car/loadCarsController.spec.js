import { describe, test, expect, beforeEach, jest } from '@jest/globals'
import { LoadCarsController } from './loadCarsController.js'

const mockCarEntity = () => {
  class CarEntityStub {
    async find() {
      //
    }
  }
  return new CarEntityStub()
}

describe('LoadCarsController', () => {
  let carEntityStub
  let sut = {}

  beforeEach(() => {
    carEntityStub = mockCarEntity()
    sut = new LoadCarsController(carEntityStub)
  })

  test('Should calls CarEntity on success', async () => {
    const spy = jest.spyOn(carEntityStub, carEntityStub.find.name)
    await sut.handle()

    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('Should return 500 if CarEntity throws', async () => {
    class CarEntityStub {
      async find() {
        throw new Error()
      }
    }

    const carEntity = new CarEntityStub()
    const sut = new LoadCarsController(carEntity)

    const httpResponse = await sut.handle()

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.error.message).toBe('Internal server error')
  })
})
