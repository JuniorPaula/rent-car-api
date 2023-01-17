import { MissingParamError } from '../../validations/errors/index.js'
import { CarCategory } from '../base/carCategory.js'
import { Customer } from '../base/customer.js'

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

    const carsFiltered = cars.filter(
      (el) => el.carCategoryId === carCategory._id,
    )

    const availableCars = new CarCategory({
      id: carCategory._id,
      name: carCategory.categoryName,
      carIds: carsFiltered,
      price: carCategory.price,
    })

    const customer = new Customer({
      name: customerName,
      age: customerAge,
    })

    console.log(customer)
    console.log(availableCars)
  }
}
