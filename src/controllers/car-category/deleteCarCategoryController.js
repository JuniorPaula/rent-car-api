import { logger } from '../../providers/pinoProvider.js'
import { HttpResponseStatus } from '../../utils/httpResponseStatus.js'

export class DeleteCarCategoryController {
  constructor(carCategoryEntity) {
    this.carCategoryEntity = carCategoryEntity
  }

  async handle(httpRequest) {
    try {
      if (!httpRequest) {
        return HttpResponseStatus.serverError()
      }

      const { carCategoryId } = httpRequest.params
      await this.carCategoryEntity.delete({ carCategoryId })

      return HttpResponseStatus.noContent()
    } catch (err) {
      logger.error('[error: delete car category]', err)
      return HttpResponseStatus.serverError()
    }
  }
}
