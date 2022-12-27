import { BaseRepository } from '../repositories/base/baseRepository.js'
import { Tax } from '../entities/tax.js'
import { NumberFormat } from '../utils/numberFormat.js'

export class CarUsecase {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars })
    this.taxesBaseOnAge = Tax.taxesBaseOnAge
  }

  getRandomPositionFromArray(list) {
    const listLength = list.length
    return Math.floor(Math.random() * listLength)
  }

  choosenRandomCar(carCategory) {
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds)
    const carId = carCategory.carIds[randomCarIndex]

    return carId
  }

  async getAvailableCar(carCategory) {
    const carId = this.choosenRandomCar(carCategory)
    const car = await this.carRepository.find(carId)

    return car
  }

  calculateFinalPrice(customer, carCategory, numberOfDays) {
    const { age } = customer
    const { price } = carCategory
    const { then: tax } = this.taxesBaseOnAge.find(
      (tax) => age >= tax.from && age <= tax.to,
    )
    const finalPrice = tax * price * numberOfDays
    const formattedPrice = NumberFormat.getCurrencyFormat(
      'pt-br',
      'BRL',
    ).format(finalPrice)

    return formattedPrice
  }
}
