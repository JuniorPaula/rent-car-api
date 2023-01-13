import { HttpResponseStatus } from '../../utils/httpResponseStatus'

export class CarController {
  constructor(carEntity) {
    this.carEntity = carEntity
  }

  async handle(httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return HttpResponseStatus.serverError()
    }

    const fields = ['name', 'releaseYear', 'available']
    for (const field of fields) {
      if (!httpRequest.body[field]) {
        return HttpResponseStatus.badRequest(field)
      }
    }

    const { name, releaseYear, available } = httpRequest.body
    await this.carEntity.create({ name, releaseYear, available })
  }
}
