export class LoadCarsController {
  constructor(carEntity) {
    this.carEntity = carEntity
  }

  async handle() {
    await this.carEntity.find()
  }
}
