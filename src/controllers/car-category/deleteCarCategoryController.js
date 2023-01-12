import { HttpResponseStatus } from '../../utils/httpResponseStatus'

export class DeleteCarCategoryController {
  async handle(httpRequest) {
    if (!httpRequest) {
      return HttpResponseStatus.serverError()
    }
  }
}
