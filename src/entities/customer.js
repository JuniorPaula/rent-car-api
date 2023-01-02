import { MissingParamError } from '../validations/errors/index.js'

export class CustomerEntity {
  constructor(customerRepository) {
    this.customerRepository = customerRepository
  }

  async saveCustomer({ name, age }) {
    if (!name || !age) {
      throw new MissingParamError('name/age')
    }

    if (!this.customerRepository) {
      throw new MissingParamError('customerRepository')
    }
    await this.customerRepository.create({ name, age })
  }
}
