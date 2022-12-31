import { MissingParamError } from '../validations/errors/missginParamError.js'

export class HttpResponseStatus {
  static badRequest(errorName) {
    return {
      statusCode: 400,
      error: new MissingParamError(errorName),
    }
  }
}
