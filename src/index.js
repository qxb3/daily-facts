require('dotenv/config')

const { getRandomFact, postRandomFact } = require('./api')
const cron = require('node-cron')
const logger = require('./logger')

function main() {
  logger.info('App Started')

  cron.schedule(process.env.CRON, async () => {
    const randomFacts = await getRandomFact()
    for (const { fact } of randomFacts) {
      postRandomFact(fact)
    }

    logger.info('Posted a random fact')
  })
}

main()
