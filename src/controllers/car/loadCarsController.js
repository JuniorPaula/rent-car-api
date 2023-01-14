import { HttpResponseStatus } from '../../utils/httpResponseStatus.js'

export class LoadCarsController {
  constructor(carEntity) {
    this.carEntity = carEntity
  }

  async handle() {
    try {
      const cars = await this.carEntity.find()

      return HttpResponseStatus.ok(cars)
    } catch (err) {
      return HttpResponseStatus.serverError()
    }
  }
}
