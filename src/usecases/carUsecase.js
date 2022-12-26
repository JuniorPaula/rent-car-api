import { BaseRepository } from '../repositories/base/baseRepository.js'

export class CarUsecase {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars })
  }

  getRandomPositionFromArray(list) {
    const listLength = list.length
    return Math.floor(Math.random() * listLength)
  }

  async getAvailableCar() {
    return null
  }
}
