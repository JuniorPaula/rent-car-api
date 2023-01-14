import { describe, test, expect, beforeEach, jest } from '@jest/globals'
import { LoadCarsController } from './loadCarsController.js'

const mocks = {
  cars: (await import('../../../mocks/cars.json')).default,
}

const mockCarEntity = () => {
  class CarEntityStub {
    async find() {
      return mocks.cars
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

  test('Should return 200 if succeeds', async () => {
    const httpResponse = await sut.handle()

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual([
      {
        _id: '778dd767-9835-4686-be52-2b8253cc6e99',
        name: 'Taurus',
        releaseYear: 2022,
        available: true,
      },
      {
        _id: '778dd767-9835-4686-be52-123456asdf',
        name: 'Fiat Cronos',
        releaseYear: 2023,
        available: true,
      },
    ])
  })
})
