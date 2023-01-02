export class CustomerEntity {
  constructor(customerRepository) {
    this.customerRepository = customerRepository
  }

  async saveCustomer({ name, age }) {
    await this.customerRepository.create({ name, age })
  }
}
