import pino from 'pino'

class PinoProvider {
  constructor() {
    this.pinoLogger = pino({
      level: process.env.LOGGER_LEVEL || 'debug',
    })
  }

  parseLoggerInputToPinoFormat({ message, loggerData }) {
    return {
      msg: message,
      err: loggerData?.error,
      ...loggerData,
    }
  }

  info(message, loggerData) {
    this.pinoLogger.info(
      this.parseLoggerInputToPinoFormat({ message, loggerData }),
    )
  }

  error(message, loggerData) {
    this.pinoLogger.error(
      this.parseLoggerInputToPinoFormat({ message, loggerData }),
    )
  }
}

export const logger = new PinoProvider()
