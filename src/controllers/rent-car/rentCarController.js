import { HttpResponseStatus } from '../../utils/httpResponseStatus'

export class RentCarController {
  constructor(rentCarEntity) {
    this.rentCarEntity = rentCarEntity
  }

  async handle(httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return HttpResponseStatus.serverError()
    }

    const fields = [
      'customerName',
      'customerAge',
      'carCategoryId',
      'numberOfDays',
    ]
    for (const field of fields) {
      if (!httpRequest.body[field]) {
        return HttpResponseStatus.badRequest(field)
      }
    }

    const { customerName, customerAge, carCategoryId, numberOfDays } =
      httpRequest.body

    await this.rentCarEntity.rent({
      customerName,
      customerAge,
      carCategoryId,
      numberOfDays,
    })
  }
}
