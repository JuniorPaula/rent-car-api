import { describe, test } from '@jest/globals'
import request from 'supertest'
import app from '../app.js'

describe('JSON Parse Middleware', () => {
  test('Should parse body as json', async () => {
    app.post('/test_json_parse', (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .post('/test_json_parse')
      .send({ name: 'Jane Doe' })
      .expect({ name: 'Jane Doe' })
  })
})
