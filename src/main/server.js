import * as dotenv from 'dotenv'
import { createServer } from 'http'
import { MongoDBProvider } from '../providers/mongodbProvider.js'
import { logger } from '../providers/pinoProvider.js'
import app from './app.js'

import('./uncaughtExceptions.js')

dotenv.config()
MongoDBProvider.connect(process.env.MONGODB_URL)
  .then(() => logger.info('database connected'))
  .catch(logger.error)

const server = createServer(app).listen(process.env.PORT, () =>
  logger.info(`server is running at port ${process.env.PORT}`),
)

process.on('SIGTERM', () => {
  logger.info(`server ending ${new Date().toISOString()}`)
  server.close(() => process.exit())
})
