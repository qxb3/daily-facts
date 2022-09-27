const pino = require('pino')

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      include: 'time,level'
    }
  }
})

module.exports = logger
