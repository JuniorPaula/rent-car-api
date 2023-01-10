import { describe, test, expect, beforeEach } from '@jest/globals'
import { UpdateCarCategoryController } from './updateCarCategoryController.js'

describe('UpdateCarCategoryController', () => {
  let sut = {}

  beforeEach(() => {
    sut = new UpdateCarCategoryController()
  })

  test('Should return 500 if no httpRequest is provided', async () => {
    const httpResponse = await sut.handle()

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.error.message).toBe('Internal server error')
  })

  test('Should return 500 if httpRequest has no params', async () => {
    const httpRequest = {}
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.error.message).toBe('Internal server error')
  })

  test('Should return 500 if httpRequest has no body', async () => {
    const httpRequest = {
      params: {
        carCategoryId: '123-asdf-098',
      },
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.error.message).toBe('Internal server error')
  })
})
