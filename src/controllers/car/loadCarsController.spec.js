import { describe, test, expect, beforeEach, jest } from '@jest/globals'

const mockCarEntity = () => {
  class CarEntityStub {
    async find() {
      //
    }
  }
  return new CarEntityStub()
}

class LoadCarsController {
  constructor(carEntity) {
    this.carEntity = carEntity
  }

  async handle() {
    await this.carEntity.find()
  }
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
