export class RentCarEntity {
  constructor(carCategoryRepository) {
    this.carCategoryRepository = carCategoryRepository
  }

  async rent({ customerName, customerAge, carCategoryId, numberOfDays }) {
    this.customerName = customerName
    this.customerAge = customerAge
    this.carCategoryId = carCategoryId
    this.numberOfDays = numberOfDays

    await this.carCategoryRepository.findById({ carCategoryId })
  }
}
