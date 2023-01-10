import { describe, test, expect, beforeEach } from '@jest/globals'
import { LoadCarCategoryController } from './loadCarCategoryController.js'

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
