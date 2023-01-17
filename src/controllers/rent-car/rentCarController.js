import { HttpResponseStatus } from '../../utils/httpResponseStatus'

export class RentCarController {
  constructor(rentCarEntity) {
    this.rentCarEntity = rentCarEntity
  }

  async handle(httpRequest) {
    try {
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

      const trasaction = await this.rentCarEntity.rent({
        customerName,
        customerAge,
        carCategoryId,
        numberOfDays,
      })

      return HttpResponseStatus.ok(trasaction)
    } catch (err) {
      return HttpResponseStatus.serverError()
    }
  }
}
