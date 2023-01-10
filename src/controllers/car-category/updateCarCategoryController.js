import { HttpResponseStatus } from '../../utils/httpResponseStatus.js'

export class UpdateCarCategoryController {
  async handle(httpRequest) {
    if (!httpRequest || !httpRequest.params) {
      return HttpResponseStatus.serverError()
    }
  }
}
