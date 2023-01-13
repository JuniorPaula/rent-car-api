import { MissingParamError } from '../../validations/errors/index.js'

export class CarEntity {
  constructor(carRepository) {
    this.carRepository = carRepository
  }

  async create({ name, releaseYear, available, carCategoryId }) {
    if (!this.carRepository) {
      throw new MissingParamError('carRepository')
    }
    await this.carRepository.create({
      name,
      releaseYear,
      available,
      carCategoryId,
    })
  }
}
