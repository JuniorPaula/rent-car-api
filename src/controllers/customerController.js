import { HttpResponseStatus } from '../utils/httpResponseStatus.js'

export class CustomerController {
  async handle(httpRequest) {
    try {
      if (!httpRequest) {
        return HttpResponseStatus.serverError()
      }
      const fields = ['name', 'age']
      for (const field of fields) {
        if (!httpRequest.body[field]) {
          return HttpResponseStatus.badRequest(field)
        }
      }
    } catch (err) {
      return {
        statusCode: 500,
        error: 'Internal server error',
      }
    }
  }
}
