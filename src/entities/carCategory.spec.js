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
  let carCategoryRepositoryStub = mockCarCategoryRepositoryStub()
  let sut = {}

  beforeEach(() => {
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
})
