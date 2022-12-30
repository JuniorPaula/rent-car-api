export class CustomerController {
  async handle(httpRequest) {
    const { name } = httpRequest.body
    if (!name) {
      return {
        statusCode: 400,
        error: `missing param: name`,
      }
    }
  }
}
