import { describe, test, expect, beforeEach, jest } from '@jest/globals'
import { RentCarController } from './rentCarController.js'

const mockRentCarEntity = () => {
  class RentCarEntityStub {
    async rent({ customerName, customerAge, carCategoryId, numberOfDays }) {
      this.customerName = customerName
      this.customerAge = customerAge
      this.carCategoryId = carCategoryId
      this.numberOfDays = numberOfDays

      return Promise.resolve({
        customer: { age: 34, name: 'Jane Doe' },
        car: {
          _id: '123-asdf-098',
          name: 'Taurus',
          releaseYear: 2022,
          available: true,
        },
        amount: 'R$ 206,80',
        dueDate: '19 de janeiro de 2023',
      })
    }
  }

  return new RentCarEntityStub()
}

describe('RentCarController', () => {
  let rentCarEntityStub
  let sut = {}

  beforeEach(() => {
    rentCarEntityStub = mockRentCarEntity()
    sut = new RentCarController(rentCarEntityStub)
  })

  test('Should return 400 if no customerName is provided', async () => {
    const httpRequest = {
      body: {
        customerAge: 34,
        carCategoryId: '123-asdf-098',
        numberOfDays: 3,
      },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.message).toBe('missing param: customerName')
  })

  test('Should return 400 if no customerAge is provided', async () => {
    const httpRequest = {
      body: {
        customerName: 'Jane Doe',
        carCategoryId: '123-asdf-098',
        numberOfDays: 3,
      },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.message).toBe('missing param: customerAge')
  })

  test('Should return 400 if no carCategoryId is provided', async () => {
    const httpRequest = {
      body: {
        customerName: 'Jane Doe',
        customerAge: 34,
        numberOfDays: 3,
      },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.message).toBe('missing param: carCategoryId')
  })

  test('Should return 400 if no numberOfDays is provided', async () => {
    const httpRequest = {
      body: {
        customerName: 'Jane Doe',
        customerAge: 34,
        carCategoryId: '123-asdf-098',
      },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.error.message).toBe('missing param: numberOfDays')
  })

  test('Should return 500 if no httpRequest is provided', async () => {
    const httpResponse = await sut.handle()

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.error.message).toBe('Internal server error')
  })

  test('Should return 500 if httpRequest has no body', async () => {
    const httpRequest = {}
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.error.message).toBe('Internal server error')
  })

  test('Should calls RentCarEntity with correct values', async () => {
    const httpRequest = {
      body: {
        customerName: 'Jane Doe',
        customerAge: 34,
        carCategoryId: '123-asdf-098',
        numberOfDays: 3,
      },
    }

    const spy = jest.spyOn(rentCarEntityStub, rentCarEntityStub.rent.name)

    await sut.handle(httpRequest)

    expect(spy).toHaveBeenCalledWith({
      customerName: 'Jane Doe',
      customerAge: 34,
      carCategoryId: '123-asdf-098',
      numberOfDays: 3,
    })
  })

  test('Should return 500 if RentCarEntity Throws', async () => {
    const httpRequest = {
      body: {
        customerName: 'Jane Doe',
        customerAge: 34,
        carCategoryId: '123-asdf-098',
        numberOfDays: 3,
      },
    }

    jest
      .spyOn(rentCarEntityStub, rentCarEntityStub.rent.name)
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.error.message).toBe('Internal server error')
  })

  test('Should return 200 and a transaction result if succeeds', async () => {
    const httpRequest = {
      body: {
        customerName: 'Jane Doe',
        customerAge: 34,
        carCategoryId: '123-asdf-098',
        numberOfDays: 3,
      },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      customer: { age: 34, name: 'Jane Doe' },
      car: {
        _id: '123-asdf-098',
        name: 'Taurus',
        releaseYear: 2022,
        available: true,
      },
      amount: 'R$ 206,80',
      dueDate: '19 de janeiro de 2023',
    })
  })
})
