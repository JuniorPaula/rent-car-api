import express from 'express'
import { setupApp } from './main/setupApp.js'
import { setupRoutes } from './routes/index.js'

const app = express()
setupApp(app)
setupRoutes(app)

export default app
