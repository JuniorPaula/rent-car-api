import { describe, test, expect } from '@jest/globals'
import { DeleteCarCategoryController } from './deleteCarCategoryController.js'

describe('DeleteCarCategoryController', () => {
  test('Should return 500 if no httpRequest is provided', async () => {
    const sut = new DeleteCarCategoryController()
    const httpResponse = await sut.handle()

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.error.message).toBe('Internal server error')
  })
})
