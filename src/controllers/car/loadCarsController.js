import { HttpResponseStatus } from '../../utils/httpResponseStatus.js'

export class LoadCarsController {
  constructor(carEntity) {
    this.carEntity = carEntity
  }

  async handle() {
    try {
      await this.carEntity.find()
    } catch (err) {
      return HttpResponseStatus.serverError()
    }
  }
}
