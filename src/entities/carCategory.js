import { MissingParamError } from '../validations/errors/index.js'

export class CarCategoryEntity {
  constructor(carCategoryRepository) {
    this.carCategoryRepository = carCategoryRepository
  }

  async create({ categoryName, price }) {
    if (!categoryName || !price) {
      throw new MissingParamError('categoryName/price')
    }

    if (!this.carCategoryRepository || !this.carCategoryRepository.save) {
      throw new MissingParamError('carCategoryRepository')
    }

    await this.carCategoryRepository.save({ categoryName, price })
  }

  async getCarCategory({ carCategoryId }) {
    if (!carCategoryId) {
      await this.carCategoryRepository.findAll()
    }

    const carCategory = await this.carCategoryRepository.findById({
      carCategoryId,
    })

    return carCategory
  }
}
