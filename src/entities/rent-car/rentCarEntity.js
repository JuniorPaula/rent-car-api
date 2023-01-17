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
      throw new MissingParamError('carCategoryRepository')
    }

    if (!this.carRepository.find) {
      throw new MissingParamError('carRepository')
    }

    const carCategory = await this.carCategoryRepository.findById({
      carCategoryId,
    })
    const cars = await this.carRepository.find()

    const availableCars = cars.filter(
      (el) => el.carCategoryId === carCategory._id,
    )

    console.log(availableCars)
  }
}
