import { logger } from '../../providers/pinoProvider.js'
import { HttpResponseStatus } from '../../utils/httpResponseStatus.js'

export class CarCategoryController {
  constructor(carCategoryEntity) {
    this.carCategoryEntity = carCategoryEntity
  }

  async handle(httpRequest) {
    try {
      if (!httpRequest || !httpRequest.body) {
        return HttpResponseStatus.serverError()
      }

      const fields = ['categoryName', 'price']
      for (const field of fields) {
        if (!httpRequest.body[field]) {
          return HttpResponseStatus.badRequest(field)
        }
      }

      const { categoryName, price } = httpRequest.body
      await this.carCategoryEntity.create({ categoryName, price })

      return HttpResponseStatus.created()
    } catch (err) {
      logger.error('[error: create car category]', err)
      return HttpResponseStatus.serverError()
    }
  }
}
