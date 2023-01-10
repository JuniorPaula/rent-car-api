import { MongoDBProvider } from '../providers/mongodbProvider.js'
import { MissingParamError } from '../validations/errors/index.js'

export class CarCategoryRepository {
  async save({ categoryName, price }) {
    if (!categoryName) {
      throw new MissingParamError('categoryName')
    }
    if (!price) {
      throw new MissingParamError('price')
    }

    const carCategoryModel = await MongoDBProvider.getCollection(
      'car_categories',
    )

    const res = await carCategoryModel.insertOne({ categoryName, price })
    return res
  }

  async findAll() {
    const carCategoryModel = await MongoDBProvider.getCollection(
      'car_categories',
    )
    const carCategories = await carCategoryModel.find().toArray()
    return carCategories
  }

  async findById({ carCategoryId }) {
    const carCategoryModel = await MongoDBProvider.getCollection(
      'car_categories',
    )
    const carCategory = await carCategoryModel.findOne({ _id: carCategoryId })
    return carCategory
  }
}
