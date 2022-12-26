import { BaseRepository } from '../repositories/base/baseRepository.js'

export class CarUsecase {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars })
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
}
