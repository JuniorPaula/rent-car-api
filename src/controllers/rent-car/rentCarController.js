import { HttpResponseStatus } from '../../utils/httpResponseStatus'

export class RentCarController {
  async handle(httpRequest) {
    if (!httpRequest) {
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
  }
}
