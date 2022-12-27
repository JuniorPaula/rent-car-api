import { BaseProtocol } from './base.js'

export class Car extends BaseProtocol {
  constructor({ id, name, releaseYear, available, gasAvailable }) {
    super({ id, name })

    this.releaseYear = releaseYear
    this.available = available
    this.gasAvailable = gasAvailable
  }
}
