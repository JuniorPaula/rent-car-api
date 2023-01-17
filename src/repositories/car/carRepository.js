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

  async findById(car) {
    const carId = car._id
    const carModel = await MongoDBProvider.getCollection('cars')
    const result = await carModel.findOne({ _id: carId })
    return result
  }

  async #getCollectionModel() {
    const carModel = await MongoDBProvider.getCollection('cars')
    return carModel
  }
}
