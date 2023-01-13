import { describe, test, beforeEach, expect, jest } from '@jest/globals'
import { CarEntity } from './car.js'

const mockCarRepository = () => {
  class CarRepositoryStub {
    async create({ name, releaseYear, available, carCategoryId }) {
      this.name = name
      this.releaseYear = releaseYear
      this.available = available
      this.carCategoryId = carCategoryId
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
})
