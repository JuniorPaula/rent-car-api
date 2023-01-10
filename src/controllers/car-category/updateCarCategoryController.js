import { HttpResponseStatus } from '../../utils/httpResponseStatus.js'

export class UpdateCarCategoryController {
  constructor(carCategoryEntity) {
    this.carCategoryEntity = carCategoryEntity
  }

  async handle(httpRequest) {
    try {
      if (!httpRequest || !httpRequest.params || !httpRequest.body) {
        return HttpResponseStatus.serverError()
      }

      const { carCategoryId } = httpRequest.params
      const { categoryName, price } = httpRequest.body

      await this.carCategoryEntity.update({
        carCategoryId,
        categoryName,
        price,
      })
    } catch (err) {
      return HttpResponseStatus.serverError()
    }
  }
}
