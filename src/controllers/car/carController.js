import { HttpResponseStatus } from '../../utils/httpResponseStatus'

export class CarController {
  async handle(httpRequest) {
    if (!httpRequest.body.name) {
      return HttpResponseStatus.badRequest('name')
    }

    if (!httpRequest.body.releaseYear) {
      return HttpResponseStatus.badRequest('releaseYear')
    }
  }
}
