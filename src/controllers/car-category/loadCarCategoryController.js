import { logger } from '../../providers/pinoProvider.js'
import { HttpResponseStatus } from '../../utils/httpResponseStatus.js'

export class LoadCarCategoryController {
  constructor(carCategoryEntity) {
    this.carCategoryEntity = carCategoryEntity
  }

  async handle(httpRequest) {
    try {
      if (!httpRequest) {
        return HttpResponseStatus.serverError()
      }

      const params = httpRequest.params
      let carCategoryId = null
      if (params) {
        carCategoryId = params.carCategoryId
      }

      const carCategories = await this.carCategoryEntity.getCarCategory({
        carCategoryId,
      })

      return HttpResponseStatus.ok(carCategories)
    } catch (err) {
      logger.error('[error: load car category]', err)
      return HttpResponseStatus.serverError()
    }
  }
}
