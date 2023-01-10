import { describe, test, beforeEach, expect, jest } from '@jest/globals'
import { CarCategoryEntity } from './carCategory.js'

const carCategoryDB = [
  {
    _id: '123-asdf-098',
    categoryName: 'SUV',
    price: '110.00',
  },
  {
    _id: '321-asdf-089',
    categoryName: 'Crew Cab Pickup',
    price: '150.90',
  },
]

const mockCarCategoryRepositoryStub = () => {
  class CarCategoryRepositoryStub {
    async save({ categoryName, price }) {
      this.categoryName = categoryName
      this.price = price
    }

    async findById({ carCategoryId }) {
      const carCategory = carCategoryDB.find(
        (categoryId) => categoryId._id === carCategoryId,
      )

      return Promise.resolve(carCategory)
    }

    async findAll() {
      return carCategoryDB
    }
  }

  return new CarCategoryRepositoryStub()
}

describe('CarCategory Entity', () => {
  let carCategoryRepositoryStub
  let sut = {}

  beforeEach(() => {
    carCategoryRepositoryStub = mockCarCategoryRepositoryStub()
    sut = new CarCategoryEntity(carCategoryRepositoryStub)
  })

  describe('#Create car category', () => {
    test('Should call CarCategoryRepository with correct values', async () => {
      const spyCarCategory = jest.spyOn(
        carCategoryRepositoryStub,
        carCategoryRepositoryStub.save.name,
      )

      await sut.create({ categoryName: 'Crew Cab Pickup', price: '150.90' })

      expect(spyCarCategory).toHaveBeenCalledWith({
        categoryName: 'Crew Cab Pickup',
        price: '150.90',
      })
    })

    test('Should throw if no param are provided', async () => {
      const spy = sut.create({})
      await expect(spy).rejects.toThrow('missing param: categoryName/price')
    })

    test('Should throw if no repository are provided on constructor', async () => {
      const sut = new CarCategoryEntity()
      const spy = sut.create({
        categoryName: 'Crew Cab Pickup',
        price: '150.90',
      })

      await expect(spy).rejects.toThrow('missing param: carCategoryRepository')
    })

    test('Should throw if CarCategoryRepository has no method save', async () => {
      class CarCategoryRepositoryStub {}
      const fakeRepository = new CarCategoryRepositoryStub()

      const sut = new CarCategoryEntity(fakeRepository)
      const spy = sut.create({
        categoryName: 'Crew Cab Pickup',
        price: '150.90',
      })

      await expect(spy).rejects.toThrow('missing param: carCategoryRepository')
    })

    test('Should throws if CarCategoryRepository to throws', async () => {
      jest
        .spyOn(carCategoryRepositoryStub, carCategoryRepositoryStub.save.name)
        .mockImplementationOnce(() => Promise.reject(new Error()))

      const promise = sut.create({
        categoryName: 'Crew Cab Pickup',
        price: '150.90',
      })

      await expect(promise).rejects.toThrow()
    })
  })

  describe('#Load car category', () => {
    test('Should call CarCategoryRepository.findById if carCategoryId is provided', async () => {
      const getCarCategorySpy = jest.spyOn(
        carCategoryRepositoryStub,
        carCategoryRepositoryStub.findById.name,
      )

      await sut.getCarCategory({ carCategoryId: '123-asdf-098' })

      expect(getCarCategorySpy).toHaveBeenCalledWith({
        carCategoryId: '123-asdf-098',
      })
      expect(getCarCategorySpy).toHaveBeenCalledTimes(1)
    })

    test('Should call CarCategoryRepository.findAll if carCategoryId to be null', async () => {
      const getCarCategorySpy = jest.spyOn(
        carCategoryRepositoryStub,
        carCategoryRepositoryStub.findAll.name,
      )

      await sut.getCarCategory({ carCategoryId: null })

      expect(getCarCategorySpy).toBeCalled()
      expect(getCarCategorySpy).toHaveBeenCalledTimes(1)
    })

    test('Should return a specifc car category when carCategoryId is provided', async () => {
      jest.spyOn(
        carCategoryRepositoryStub,
        carCategoryRepositoryStub.findById.name,
      )

      const carCategory = await sut.getCarCategory({
        carCategoryId: '123-asdf-098',
      })

      expect(carCategory).toEqual({
        _id: '123-asdf-098',
        categoryName: 'SUV',
        price: '110.00',
      })
    })

    test('Should return all car categories when carCategoryId is not provided', async () => {
      jest.spyOn(
        carCategoryRepositoryStub,
        carCategoryRepositoryStub.findAll.name,
      )

      const carCategory = await sut.getCarCategory({
        carCategoryId: null,
      })

      expect(carCategory).toEqual(carCategoryDB)
    })

    test('Should throw if CarCategoryRepository has no method save', async () => {
      class CarCategoryRepositoryStub {}
      const fakeRepository = new CarCategoryRepositoryStub()

      const sut = new CarCategoryEntity(fakeRepository)
      const spy = sut.getCarCategory({
        carCategoryId: null,
      })

      await expect(spy).rejects.toThrow('missing param: carCategoryRepository')
    })
  })
})
