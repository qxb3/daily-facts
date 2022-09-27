require('dotenv/config')

const { getRandomFact, postRandomFact } = require('./api')
const scheduler = require('./scheduler')

const logger = require('./logger')

function main() {
  logger.info('App Started')

  scheduler(process.env.CRON, async () => {
    const randomFacts = await getRandomFact(process.env.CALLS_PER_TIME || 1)
    for (const { fact } of randomFacts) {
      await postRandomFact(`Did you know? - ${fact}`)
    }

    logger.info('Posted a random fact')
  })
}

main()
