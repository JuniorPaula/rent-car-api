import { describe, test, beforeEach, expect, jest } from '@jest/globals'

const mockCarCategoryRepositoryStub = () => {
  class CarCategoryRepositoryStub {
    async save({ categoryName, price }) {
      this.categoryName = categoryName
      this.price = price
    }
  }

  return new CarCategoryRepositoryStub()
}

class CarCategoryEntity {
  constructor(carCategoryRepository) {
    this.carCategoryRepository = carCategoryRepository
  }

  async create({ categoryName, price }) {
    await this.carCategoryRepository.save({ categoryName, price })
  }
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
})
