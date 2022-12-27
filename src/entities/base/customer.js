import { BaseProtocol } from './base.js'

export class Customer extends BaseProtocol {
  constructor({ id, name, age }) {
    super({ id, name })

    this.age = age
  }
}
