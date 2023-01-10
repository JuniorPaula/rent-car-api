import { HttpResponseStatus } from '../../utils/httpResponseStatus.js'

export class LoadCarCategoryController {
  constructor(carCategoryEntity) {
    this.carCategoryEntity = carCategoryEntity
  }

  async handle(httpRequest) {
    if (!httpRequest) {
      return HttpResponseStatus.serverError()
    }

    const params = httpRequest.params
    let carCategoryId = null
    if (params) {
      carCategoryId = params.carCategoryId
    }

    await this.carCategoryEntity.getCarCategory({ carCategoryId })
  }
}
