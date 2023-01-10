import { MissingParamError, ServerError } from '../validations/errors/index.js'

export class HttpResponseStatus {
  static ok(data) {
    return {
      statusCode: 200,
      body: data,
    }
  }

  static noContent() {
    return {
      statusCode: 201,
      body: 'no content',
    }
  }

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
