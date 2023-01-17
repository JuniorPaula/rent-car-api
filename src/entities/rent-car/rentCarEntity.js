import { MissingParamError } from '../../validations/errors/index.js'
import { CarCategory } from '../base/carCategory.js'
import { Customer } from '../base/customer.js'

export class RentCarEntity {
  constructor(carCategoryRepository, carRepository, carUsecase) {
    this.carCategoryRepository = carCategoryRepository
    this.carRepository = carRepository
    this.carUsecase = carUsecase
  }

  async rent({ customerName, customerAge, carCategoryId, numberOfDays }) {
    this.#verifyErrors()

    const availableCars = await this.#getCarAvailables(carCategoryId)
    const customer = await this.#getCustomer(customerName, customerAge)

    const transaction = await this.carUsecase.rent(
      customer,
      availableCars,
      numberOfDays,
    )

    return transaction
  }

  #verifyErrors() {
    if (!this.carCategoryRepository.findById) {
      throw new MissingParamError('carCategoryRepository')
    }

    if (!this.carRepository.find) {
      throw new MissingParamError('carRepository')
    }

    if (!this.carUsecase.rent) {
      throw new MissingParamError('carUsecase')
    }
  }

  async #getCarAvailables(carCategoryId) {
    const carCategory = await this.carCategoryRepository.findById({
      carCategoryId,
    })
    const cars = await this.carRepository.find()

    const carsFiltered = cars.filter((el) => {
      return el.carCategoryId.toString() === carCategory._id.toString()
    })
    const availableCars = new CarCategory({
      id: carCategory._id,
      name: carCategory.categoryName,
      carIds: carsFiltered,
      price: carCategory.price,
    })

    return availableCars
  }

  async #getCustomer(customerName, customerAge) {
    const customer = new Customer({
      name: customerName,
      age: customerAge,
    })
    return customer
  }
}
