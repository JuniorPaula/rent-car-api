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
})
