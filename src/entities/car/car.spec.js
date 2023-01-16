import { describe, test, beforeEach, expect, jest } from '@jest/globals'
import { CarEntity } from './car.js'

const mocks = {
  cars: (await import('../../../mocks/cars.json')).default,
}

const mockCarRepository = () => {
  class CarRepositoryStub {
    async create({ name, releaseYear, available, carCategoryId }) {
      this.name = name
      this.releaseYear = releaseYear
      this.available = available
      this.carCategoryId = carCategoryId
    }

    async find() {
      return Promise.resolve(mocks.cars)
    }
  }

  return new CarRepositoryStub()
}

describe('CarEntity', () => {
  let carRepositoryStub
  let sut = {}

  beforeEach(() => {
    carRepositoryStub = mockCarRepository()
    sut = new CarEntity(carRepositoryStub)
  })

  describe('#Create', () => {
    test('Should call CarRepository with correct values', async () => {
      const spy = jest.spyOn(carRepositoryStub, carRepositoryStub.create.name)

      await sut.create({
        name: 'Taurus',
        releaseYear: '2023',
        available: true,
        carCategoryId: '123-asdf-098',
      })

      expect(spy).toHaveBeenCalledWith({
        name: 'Taurus',
        releaseYear: '2023',
        available: true,
        carCategoryId: '123-asdf-098',
      })
    })

    test('Should throw if no repository are provided on constructor', async () => {
      const sut = new CarEntity()
      const spy = sut.create({
        name: 'Taurus',
        releaseYear: '2023',
        available: true,
        carCategoryId: '123-asdf-098',
      })

      await expect(spy).rejects.toThrow('missing param: carRepository')
    })

    test('Should throw if CarRepository has no method create', async () => {
      class CarRepositoryStub {}
      const fakeRepository = new CarRepositoryStub()

      const sut = new CarEntity(fakeRepository)
      const spy = sut.create({
        name: 'Taurus',
        releaseYear: '2023',
        available: true,
        carCategoryId: '123-asdf-098',
      })

      await expect(spy).rejects.toThrow('missing param: carRepository')
    })

    test('Should throws if CarRepository to throws', async () => {
      jest
        .spyOn(carRepositoryStub, carRepositoryStub.create.name)
        .mockImplementationOnce(() => Promise.reject(new Error()))

      const promise = sut.create({
        name: 'Taurus',
        releaseYear: '2023',
        available: true,
        carCategoryId: '123-asdf-098',
      })

      await expect(promise).rejects.toThrow()
    })
  })

  describe('#Load', () => {
    test('Should call CarRepository.find once time', async () => {
      const carsSpy = jest.spyOn(carRepositoryStub, carRepositoryStub.find.name)

      await sut.find()
      expect(carsSpy).toHaveBeenCalled()
    })

    test('Should throw if CarRepository has no method find', async () => {
      class CarRepositoryStub {}
      const fakeRepository = new CarRepositoryStub()

      const sut = new CarEntity(fakeRepository)
      const spy = sut.find()

      await expect(spy).rejects.toThrow('missing param: carRepository')
    })

    test('When call CarRepository.find Should return a list of cars', async () => {
      const cars = await sut.find()
      expect(cars).toEqual([
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
})
