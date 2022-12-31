import { HttpResponseStatus } from '../utils/httpResponseStatus.js'

export class CustomerController {
  async handle(httpRequest) {
    const fields = ['name', 'age']
    for (const field of fields) {
      if (!httpRequest.body[field]) {
        return HttpResponseStatus.badRequest(field)
      }
    }
  }
}
