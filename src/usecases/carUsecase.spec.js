import { describe, test, expect, beforeEach, jest } from '@jest/globals'
import { CarUsecase } from './carUsecase.js'
import { join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const carsDatabase = join(__dirname, './../../database', 'cars.json')

const mocks = {
  validCarCategory: (await import('../../mocks/valid-carCategory.json'))
    .default,
  validCar: (await import('../../mocks/valid-car.json')).default,
  validCustomer: (await import('../../mocks/valid-customer.json')).default,
}

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

  test('should choosen the first id from carIds in carCategory', () => {
    const carCategory = mocks.validCarCategory
    const carIdIndex = 0

    jest
      .spyOn(carUsecase, carUsecase.getRandomPositionFromArray.name)
      .mockReturnValueOnce(carIdIndex)

    const result = carUsecase.choosenRandomCar(carCategory)
    const expected = carCategory.carIds[carIdIndex]

    expect(carUsecase.getRandomPositionFromArray).toHaveBeenCalledTimes(1)
    expect(result).toEqual(expected)
  })

  test('give a carCategory it should return an available car', async () => {
    const car = mocks.validCar
    const carCategory = Object.create(mocks.validCarCategory)
    carCategory.carIds = [car.id]

    jest
      .spyOn(carUsecase.carRepository, carUsecase.carRepository.find.name)
      .mockReturnValueOnce(car)

    jest.spyOn(carUsecase, carUsecase.choosenRandomCar.name)

    const result = await carUsecase.getAvailableCar(carCategory)

    expect(carUsecase.choosenRandomCar).toHaveBeenCalledTimes(1)
    expect(carUsecase.carRepository.find).toHaveBeenCalledWith(car.id)
    expect(result).toEqual(car)
  })
})
