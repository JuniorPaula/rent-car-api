import { ObjectId } from 'mongodb'
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
    const carCategoryModel = await this.#getCollectionModel()

    const res = await carCategoryModel.insertOne({ categoryName, price })
    return res
  }

  async findAll() {
    const carCategoryModel = await this.#getCollectionModel()
    const carCategories = await carCategoryModel.find().toArray()
    return carCategories
  }

  async findById({ carCategoryId }) {
    if (!carCategoryId) {
      throw new MissingParamError('carCategoryId')
    }

    const carCategoryModel = await this.#getCollectionModel()
    const carCategory = await carCategoryModel.findOne({
      _id: new ObjectId(carCategoryId),
    })

    return carCategory
  }

  async update({ carCategoryId, categoryName, price }) {
    if (!carCategoryId) {
      throw new MissingParamError('carCategoryId')
    }
    if (!categoryName) {
      throw new MissingParamError('categoryName')
    }

    const carCategoryModel = await this.#getCollectionModel()
    if (!price) {
      await carCategoryModel.updateOne(
        { _id: new ObjectId(carCategoryId) },
        { $set: { categoryName } },
      )
      const carCategory = await carCategoryModel.findOne({ _id: carCategoryId })
      return carCategory
    }

    await carCategoryModel.updateOne(
      { _id: new ObjectId(carCategoryId) },
      { $set: { categoryName, price } },
    )
    const carCategory = await carCategoryModel.findOne({ _id: carCategoryId })
    return carCategory
  }

  async #getCollectionModel() {
    const carCategoryModel = await MongoDBProvider.getCollection(
      'car_categories',
    )
    return carCategoryModel
  }
}
