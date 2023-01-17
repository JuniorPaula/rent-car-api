import { Tax } from '../entities/tax.js'
import { NumberFormat } from '../utils/numberFormat.js'
import { Transaction } from '../entities/transaction.js'

export class CarUsecase {
  constructor(carRepository) {
    this.carRepository = carRepository
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
    const car = await this.carRepository.findById(carId)
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

  async rent(customer, carCategory, numberOfDays) {
    const car = await this.getAvailableCar(carCategory)
    const finalPrice = this.calculateFinalPrice(
      customer,
      carCategory,
      numberOfDays,
    )

    const today = new Date()
    today.setDate(today.getDate() + numberOfDays)
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const dueDate = today.toLocaleDateString('pt-br', options)

    const transaction = new Transaction({
      customer,
      dueDate,
      car,
      amount: finalPrice,
    })

    return transaction
  }
}
