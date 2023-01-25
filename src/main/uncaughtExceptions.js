import { logger } from '../providers/pinoProvider.js'

process.on('uncaughtException', (error, origin) => {
  logger.error(`${origin} signal received. ${error}`)
})

process.on('unhandledRejection', (error) => {
  logger.error(`unhandledRejection signal received. ${error}`)
})
