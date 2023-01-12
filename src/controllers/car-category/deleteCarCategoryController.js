import { HttpResponseStatus } from '../../utils/httpResponseStatus'

export class DeleteCarCategoryController {
  constructor(carCategoryEntity) {
    this.carCategoryEntity = carCategoryEntity
  }

  async handle(httpRequest) {
    if (!httpRequest) {
      return HttpResponseStatus.serverError()
    }

    const { carCategoryId } = httpRequest.params
    await this.carCategoryEntity.delete({ carCategoryId })
  }
}
