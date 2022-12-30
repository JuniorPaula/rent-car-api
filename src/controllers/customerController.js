export class CustomerController {
  async handle(httpRequest) {
    const { name, age } = httpRequest.body
    if (!name) {
      return {
        statusCode: 400,
        error: `missing param: name`,
      }
    }
    if (!age) {
      return {
        statusCode: 400,
        error: `missing param: age`,
      }
    }
  }
}
