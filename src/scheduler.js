const cron = require('node-cron')

module.exports = (expression, callbackFn) => {
  cron.schedule(expression, callbackFn)
}
