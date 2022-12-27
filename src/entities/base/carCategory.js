import { BaseProtocol } from './base.js'

export class CarCategory extends BaseProtocol {
  constructor({ id, name, carIds, price }) {
    super({ id, name })

    this.carIds = carIds
    this.price = price
  }
}
