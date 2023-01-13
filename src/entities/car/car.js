export class CarEntity {
  constructor(carRepository) {
    this.carRepository = carRepository
  }

  async create({ name, releaseYear, available, carCategoryId }) {
    await this.carRepository.create({
      name,
      releaseYear,
      available,
      carCategoryId,
    })
  }
}
