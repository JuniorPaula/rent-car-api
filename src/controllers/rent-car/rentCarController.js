import { HttpResponseStatus } from '../../utils/httpResponseStatus'

export class RentCarController {
  async hanlde(httpRequest) {
    if (!httpRequest.body.customerName) {
      return HttpResponseStatus.badRequest('customerName')
    }
  }
}
