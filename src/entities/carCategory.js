export class CarCategoryEntity {
  constructor(carCategoryRepository) {
    this.carCategoryRepository = carCategoryRepository
  }

  async create({ categoryName, price }) {
    await this.carCategoryRepository.save({ categoryName, price })
  }
}
