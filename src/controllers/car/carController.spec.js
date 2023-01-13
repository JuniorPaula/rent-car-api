import { describe, test, expect } from '@jest/globals'
import { HttpResponseStatus } from '../../utils/httpResponseStatus'

class CarController {
  async handle(httpRequest) {
    if (!httpRequest.body.name) {
      return HttpResponseStatus.badRequest('name')
    }
  }
}

describe('CarController', () => {
  test('Should return 400 if name is not provided', async () => {
    const httpRequest = {
      body: {
        releaseYear: '2023',
        available: true,
      },
    }
    const sut = new CarController()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.message).toBe('missing param: name')
  })
})
