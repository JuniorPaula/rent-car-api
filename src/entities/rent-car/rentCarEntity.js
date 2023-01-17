import { MissingParamError } from '../../validations/errors'

export class RentCarEntity {
  constructor(carCategoryRepository, carRepository) {
    this.carCategoryRepository = carCategoryRepository
    this.carRepository = carRepository
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
    await this.carRepository.find()
  }
}
