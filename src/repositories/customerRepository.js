import { MongoDBProvider } from '../providers/mongodbProvider.js'
import { MissingParamError } from '../validations/errors/index.js'

export class CustomerRepository {
  async create({ name, age }) {
    if (!name) {
      throw new MissingParamError('name')
    }
    if (!age) {
      throw new MissingParamError('age')
    }

    const customerModel = await MongoDBProvider.getCollection('customers')
    const res = await customerModel.insertOne({ name, age })
    return res
  }
}
