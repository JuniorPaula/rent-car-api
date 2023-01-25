import { logger } from '../providers/pinoProvider.js'

export function graceFullshutdown(event) {
  return (code) => {
    logger.info(`${event} received`, code)

    process.exit(code)
  }
}

process.on('SIGINT', graceFullshutdown('SIGINT'))
process.on('SIGTERM', graceFullshutdown('SIGTERM'))
process.on('exit', graceFullshutdown('exit'))
