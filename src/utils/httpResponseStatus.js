import { MissingParamError, ServerError } from '../validations/errors/index.js'

export class HttpResponseStatus {
  static badRequest(errorName) {
    return {
      statusCode: 400,
      error: new MissingParamError(errorName),
    }
  }

  static serverError() {
    return {
      statusCode: 500,
      error: new ServerError(),
    }
  }
}
