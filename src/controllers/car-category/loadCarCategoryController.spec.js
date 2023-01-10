import { describe, test, expect } from '@jest/globals'
import { HttpResponseStatus } from '../../utils/httpResponseStatus.js'

class LoadCarCategoryController {
  async handle(httpRequest) {
    if (!httpRequest) {
      return HttpResponseStatus.serverError()
    }
  }
}

describe('LoadCarCategoryController', () => {
  test('Should return 500 if no httpRequest is provided', async () => {
    const sut = new LoadCarCategoryController()
    const httpResponse = await sut.handle()

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.error.message).toBe('Internal server error')
  })
})
