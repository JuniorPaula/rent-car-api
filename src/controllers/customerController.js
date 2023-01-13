import { HttpResponseStatus } from '../utils/httpResponseStatus.js'

export class CustomerController {
  constructor(customerEntity) {
    this.customerEntity = customerEntity
  }

  async handle(httpRequest) {
    try {
      if (!httpRequest || !httpRequest.body) {
        return HttpResponseStatus.serverError()
      }

      const fields = ['name', 'age']
      for (const field of fields) {
        if (!httpRequest.body[field]) {
          return HttpResponseStatus.badRequest(field)
        }
      }

      const { name, age } = httpRequest.body
      await this.customerEntity.saveCustomer({ name, age })

      return HttpResponseStatus.created()
    } catch (err) {
      return HttpResponseStatus.serverError()
    }
  }
}
