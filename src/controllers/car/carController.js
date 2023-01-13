import { HttpResponseStatus } from '../../utils/httpResponseStatus'

export class CarController {
  async handle(httpRequest) {
    if (!httpRequest) {
      return HttpResponseStatus.serverError()
    }

    const fields = ['name', 'releaseYear', 'available']
    for (const field of fields) {
      if (!httpRequest.body[field]) {
        return HttpResponseStatus.badRequest(field)
      }
    }
  }
}
