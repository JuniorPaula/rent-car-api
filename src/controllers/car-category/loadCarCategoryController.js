import { HttpResponseStatus } from '../../utils/httpResponseStatus.js'

export class LoadCarCategoryController {
  constructor(carCategoryEntity) {
    this.carCategoryEntity = carCategoryEntity
  }

  async handle(httpRequest) {
    if (!httpRequest) {
      return HttpResponseStatus.serverError()
    }

    const { carCategoryId } = httpRequest.params
    await this.carCategoryEntity.getCarCategory({ carCategoryId })
  }
}
