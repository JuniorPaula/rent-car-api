export class CarCategory {
  async handle(httpRequest) {
    if (!httpRequest.body.categoryName) {
      return {
        statusCode: 400,
        error: new Error('missing param: categoryName'),
      }
    }

    if (!httpRequest.body.price) {
      return {
        statusCode: 400,
        error: new Error('missing param: price'),
      }
    }
  }
}
