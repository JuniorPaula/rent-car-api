import { HttpResponseStatus } from '../utils/httpResponseStatus.js'

export class CarCategoryController {
  async handle(httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return HttpResponseStatus.serverError()
    }

    const fields = ['categoryName', 'price']
    for (const field of fields) {
      if (!httpRequest.body[field]) {
        return HttpResponseStatus.badRequest(field)
      }
    }
  }
}
