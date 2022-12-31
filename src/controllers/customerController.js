import { HttpResponseStatus } from '../utils/httpResponseStatus.js'

export class CustomerController {
  async handle(httpRequest) {
    const { name, age } = httpRequest.body
    if (!name) {
      return HttpResponseStatus.badRequest('name')
    }
    if (!age) {
      return HttpResponseStatus.badRequest('age')
    }
  }
}
