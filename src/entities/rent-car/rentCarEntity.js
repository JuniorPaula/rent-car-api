import { MissingParamError } from '../../validations/errors'

export class RentCarEntity {
  constructor(carCategoryRepository) {
    this.carCategoryRepository = carCategoryRepository
  }

  async rent({ customerName, customerAge, carCategoryId, numberOfDays }) {
    this.customerName = customerName
    this.customerAge = customerAge
    this.carCategoryId = carCategoryId
    this.numberOfDays = numberOfDays

    if (!this.carCategoryRepository.findById) {
      throw new MissingParamError('carRepository')
    }

    await this.carCategoryRepository.findById({ carCategoryId })
  }
}
