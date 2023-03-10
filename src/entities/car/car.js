import { MissingParamError } from '../../validations/errors/index.js'

export class CarEntity {
  constructor(carRepository) {
    this.carRepository = carRepository
  }

  async create({ name, releaseYear, available, carCategoryId }) {
    if (!this.carRepository || !this.carRepository.create) {
      throw new MissingParamError('carRepository')
    }
    await this.carRepository.create({
      name,
      releaseYear,
      available,
      carCategoryId,
    })
  }

  async find() {
    if (!this.carRepository.find) {
      throw new MissingParamError('carRepository')
    }

    const cars = await this.carRepository.find()
    return cars
  }
}
