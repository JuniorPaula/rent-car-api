import { MissingParamError } from '../../validations/errors/index.js'

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
    if (
      !this.carCategoryRepository.findAll ||
      !this.carCategoryRepository.findById
    ) {
      throw new MissingParamError('carCategoryRepository')
    }

    if (!carCategoryId) {
      const carCategories = await this.carCategoryRepository.findAll()
      return carCategories
    }

    const carCategory = await this.carCategoryRepository.findById({
      carCategoryId,
    })

    return carCategory
  }

  async update({ carCategoryId, categoryName, price }) {
    if (!this.carCategoryRepository.update) {
      throw new MissingParamError('carCategoryRepository')
    }
    if (!categoryName) {
      throw new MissingParamError('categoryName')
    }

    const carCategory = await this.carCategoryRepository.update({
      carCategoryId,
      categoryName,
      price,
    })

    return carCategory
  }

  async delete({ carCategoryId }) {
    if (!this.carCategoryRepository.delete) {
      throw new MissingParamError('carCategoryRepository')
    }

    await this.carCategoryRepository.delete({ carCategoryId })
  }
}
