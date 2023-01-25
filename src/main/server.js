import * as dotenv from 'dotenv'
import { MongoDBProvider } from '../providers/mongodbProvider.js'
import { logger } from '../providers/pinoProvider.js'
import app from './app.js'

import('./gracefulShutdown.js')
import('./uncaughtExceptions.js')

dotenv.config()
MongoDBProvider.connect(process.env.MONGODB_URL)
  .then(() => logger.info('database connected'))
  .catch(logger.error)

app.listen(process.env.PORT, () =>
  logger.info(`server is running at port ${process.env.PORT}`),
)
