import { describe, test, expect, beforeEach } from '@jest/globals'
import { CarUsecase } from './carUsecase.js'
import { join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const carsDatabase = join(__dirname, './../../database', 'cars.json')

// const mocks = {
//   validCarCategory: import('../../mocks/valid-carCategory.json'),
//   validCar: import('../../mocks/valid-car.json'),
//   validCustomer: import('../../mocks/valid-customer.json'),
// }

describe('CarUsecase suite test', () => {
  let carUsecase = {}
  beforeEach(() => {
    carUsecase = new CarUsecase({ cars: carsDatabase })
  })

  test('should retrieve a random position from an array', () => {
    const data = [1, 2, 3, 4, 5]
    const result = carUsecase.getRandomPositionFromArray(data)

    expect(result).toBeLessThan(data.length)
    expect(result).toBeGreaterThanOrEqual(0)
  })

  // test('give a carCategory it should return an available car', async () => {
  //   const car = mocks.validCar
  //   const carCategory = Object.create(mocks.validCarCategory)
  //   carCategory.ids = [car.id]

  //   const result = await carUsecase.getAvailableCar(carCategory)

  //   expect(result).toEqual(car)
  // })
})
