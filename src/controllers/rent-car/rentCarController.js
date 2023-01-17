import { HttpResponseStatus } from '../../utils/httpResponseStatus'

export class RentCarController {
  async hanlde(httpRequest) {
    const fields = ['customerName', 'customerAge']
    for (const field of fields) {
      if (!httpRequest.body[field]) {
        return HttpResponseStatus.badRequest(field)
      }
    }
  }
}
