import { describe, test, beforeEach, expect, jest } from '@jest/globals'
import { CarCategoryEntity } from './carCategory.js'

const mockCarCategoryRepositoryStub = () => {
  class CarCategoryRepositoryStub {
    async save({ categoryName, price }) {
      this.categoryName = categoryName
      this.price = price
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
    const spy = sut.create({ categoryName: 'Crew Cab Pickup', price: '150.90' })

    await expect(spy).rejects.toThrow('missing param: carCategoryRepository')
  })

  test('Should throw if CarCategoryRepository has no method save', async () => {
    class CarCategoryRepositoryStub {}
    const fakeRepository = new CarCategoryRepositoryStub()

    const sut = new CarCategoryEntity(fakeRepository)
    const spy = sut.create({ categoryName: 'Crew Cab Pickup', price: '150.90' })

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
