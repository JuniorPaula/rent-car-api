import { MongoClient } from 'mongodb'

export class MongoDBProvider {
  static async connect(uri) {
    this.client = await MongoClient.connect(uri)
    this.database = this.client.db()
  }

  static async disconnect() {
    await this.client.close()
  }

  static async getCollection(collection) {
    return this.database.collection(collection)
  }
}
