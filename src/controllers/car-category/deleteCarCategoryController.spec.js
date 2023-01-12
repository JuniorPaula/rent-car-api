import { describe, test, expect, beforeEach } from '@jest/globals'
import { DeleteCarCategoryController } from './deleteCarCategoryController.js'

describe('DeleteCarCategoryController', () => {
  let sut = {}

  beforeEach(() => {
    sut = new DeleteCarCategoryController()
  })

  test('Should return 500 if no httpRequest is provided', async () => {
    const httpResponse = await sut.handle()

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.error.message).toBe('Internal server error')
  })
})
