import { describe, test, beforeEach, jest } from '@jest/globals'
import request from 'supertest'

describe('ContentType Middleware', () => {
  let app

  beforeEach(async () => {
    jest.resetModules()
    app = (await import('../main/app.js')).default
  })
  test('Should enabled json content type as default', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send('')
    })

    await request(app).get('/test_content_type').expect('content-type', /json/)
  })
})
