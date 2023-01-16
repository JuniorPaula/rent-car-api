import { MongoDBProvider } from '../../providers/mongodbProvider.js'

export class CarRepository {
  async create({ name, releaseYear, available, carCategoryId }) {
    const carModel = await this.#getCollectionModel()
    await carModel.insertOne({ name, releaseYear, available, carCategoryId })
  }

  async find() {
    const carModel = await MongoDBProvider.getCollection('cars')
    const cars = await carModel.find().toArray()
    return cars
  }

  async #getCollectionModel() {
    const carModel = await MongoDBProvider.getCollection('cars')
    return carModel
  }
}
