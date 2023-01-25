import { logger } from '../../providers/pinoProvider.js'
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
      logger.error('[error: load car]', err)
      return HttpResponseStatus.serverError()
    }
  }
}
