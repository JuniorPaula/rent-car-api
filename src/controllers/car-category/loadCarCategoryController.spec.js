import { describe, test, expect, beforeEach } from '@jest/globals'
import { HttpResponseStatus } from '../../utils/httpResponseStatus.js'

class LoadCarCategoryController {
  async handle(httpRequest) {
    if (!httpRequest) {
      return HttpResponseStatus.serverError()
    }
  }
}

describe('LoadCarCategoryController', () => {
  let sut = {}

  beforeEach(() => {
    sut = new LoadCarCategoryController()
  })

  test('Should return 500 if no httpRequest is provided', async () => {
    const httpResponse = await sut.handle()

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.error.message).toBe('Internal server error')
  })
})
