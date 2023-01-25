import { logger } from '../../providers/pinoProvider.js'
import { HttpResponseStatus } from '../../utils/httpResponseStatus.js'

export class CarController {
  constructor(carEntity) {
    this.carEntity = carEntity
  }

  async handle(httpRequest) {
    try {
      if (!httpRequest || !httpRequest.body) {
        return HttpResponseStatus.serverError()
      }

      const fields = ['name', 'releaseYear', 'available', 'carCategoryId']
      for (const field of fields) {
        if (!httpRequest.body[field]) {
          return HttpResponseStatus.badRequest(field)
        }
      }

      const { name, releaseYear, available, carCategoryId } = httpRequest.body
      await this.carEntity.create({
        name,
        releaseYear,
        available,
        carCategoryId,
      })

      return HttpResponseStatus.created()
    } catch (err) {
      logger.error('[error: create car]', err)
      return HttpResponseStatus.serverError()
    }
  }
}
