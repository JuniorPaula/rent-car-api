import { HttpResponseStatus } from '../../utils/httpResponseStatus.js'

export class LoadCarCategoryController {
  async handle(httpRequest) {
    if (!httpRequest) {
      return HttpResponseStatus.serverError()
    }
  }
}
