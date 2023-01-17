import { describe, test, beforeEach, expect, jest } from '@jest/globals'
import { RentCarEntity } from './rentCarEntity.js'

// const mocks = {
//   cars: (await import('../../../mocks/cars.json')).default,
// }

// const mockCarRepository = () => {
//   class CarRepositoryStub {
//     async find() {
//       return Promise.resolve()
//     }
//   }
// }

const mockCarCategoryRepository = () => {
  class CarCategoryRepositoryStub {
    async findById({ carCategoryId }) {
      this.carCategoryId = carCategoryId
    }
  }

  return new CarCategoryRepositoryStub()
}

describe('RentCarEntity', () => {
  let carCategoryRepositoryStub
  let sut = {}

  beforeEach(() => {
    carCategoryRepositoryStub = mockCarCategoryRepository()
    sut = new RentCarEntity(carCategoryRepositoryStub)
  })

  test('Should call CarCategoryRepository with correct carCategoryId', async () => {
    const spy = jest.spyOn(
      carCategoryRepositoryStub,
      carCategoryRepositoryStub.findById.name,
    )

    await sut.rent({
      customerName: 'Jane Doe',
      customerAge: 34,
      carCategoryId: '123-asdf-098',
      numberOfDays: 3,
    })

    expect(spy).toHaveBeenCalledWith({ carCategoryId: '123-asdf-098' })
  })

  test('Should throw if CarRepository has no method findById', async () => {
    class CarRepositoryStub {}
    const fakeRepository = new CarRepositoryStub()

    const sut = new RentCarEntity(fakeRepository)
    const spy = sut.rent({
      customerName: 'Jane Doe',
      customerAge: 34,
      carCategoryId: '123-asdf-098',
      numberOfDays: 3,
    })

    await expect(spy).rejects.toThrow('missing param: carRepository')
  })

  // test('Should return all cars when CarRepository to be called', async () => {
  //   const spy = jest.spyOn(carRepositoryStub, carRepositoryStub.find.name)

  //   await sut.rent({
  //     customerName: 'Jane Doe',
  //     customerAge: 34,
  //     carCategoryId: '63bd42b3b88946ad152404ab',
  //     numberOfDays: 3,
  //   })

  //   expect(spy).toHaveBeenCalledWith({ carCategoryId: '123-asdf-098' })
  // })
})
