import { describe, test, expect, beforeEach, jest } from '@jest/globals'
import { CarUsecase } from './carUsecase.js'
import { NumberFormat } from '../utils/numberFormat.js'
import { Transaction } from '../entities/transaction.js'

const mocks = {
  validCarCategory: (await import('../../mocks/valid-carCategory.json'))
    .default,
  validCar: (await import('../../mocks/valid-car.json')).default,
  validCustomer: (await import('../../mocks/valid-customer.json')).default,
  cars: (await import('../../mocks/cars.json')).default,
}

const mockCarRepository = () => {
  class CarRepositoryStub {
    async find(carId) {
      const cars = mocks.cars

      const car = cars.find((el) => el._id === carId)
      return car
    }
  }
  return new CarRepositoryStub()
}

describe('CarUsecase suite test', () => {
  let carRepositoryStub
  let carUsecase = {}

  beforeEach(() => {
    carRepositoryStub = mockCarRepository()
    carUsecase = new CarUsecase(carRepositoryStub)
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
      .spyOn(carRepositoryStub, carRepositoryStub.find.name)
      .mockReturnValueOnce(car)

    jest.spyOn(carUsecase, carUsecase.choosenRandomCar.name)

    const result = await carUsecase.getAvailableCar(carCategory)

    expect(carUsecase.choosenRandomCar).toHaveBeenCalledTimes(1)
    expect(carRepositoryStub.find).toHaveBeenCalledWith(car.id)
    expect(result).toEqual(car)
  })

  test('given a carCategory, customer and numberOfDays it should calculate final amount in real', async () => {
    const customer = Object.create(mocks.validCustomer)
    customer.age = 50

    const carCategory = Object.create(mocks.validCarCategory)
    carCategory.price = 37.6

    const numberOfDays = 5

    const expected = NumberFormat.getCurrencyFormat('pt-br', 'BRL').format(
      244.4,
    )

    const result = carUsecase.calculateFinalPrice(
      customer,
      carCategory,
      numberOfDays,
    )

    expect(result).toEqual(expected)
  })

  test('given a customer and a car category it should return a transaction receipt', async () => {
    const car = mocks.validCar
    const carCategory = {
      ...mocks.validCarCategory,
      price: 37.6,
      carIds: [car.id],
    }

    const customer = Object.create(mocks.validCustomer)
    customer.age = 20
    customer.name = 'Jane Doe'

    const numberOfDays = 5
    const today = new Date()
    today.setDate(today.getDate() + numberOfDays)
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const dueDate = today.toLocaleDateString('pt-br', options)

    const now = new Date(2022, 11, 27)
    jest.spyOn(now, 'getTime').mockReturnValueOnce(now)

    jest
      .spyOn(carUsecase.carRepository, carUsecase.carRepository.find.name)
      .mockReturnValueOnce(car)

    const expectedAmount = NumberFormat.getCurrencyFormat(
      'pt-br',
      'BRL',
    ).format(206.8)

    const result = await carUsecase.rent(customer, carCategory, numberOfDays)

    const expected = new Transaction({
      customer,
      car,
      dueDate,
      amount: expectedAmount,
    })

    expect(result).toEqual(expected)
  })
})
