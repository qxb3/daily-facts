require('dotenv/config')

const axios = require('axios')
const cron = require('node-cron')
const pino = require('pino')

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      include: 'time,level'
    }
  }
})

async function getRandomFact(count = 1) {
  try {
    const { data } = await axios.get(`https://api.api-ninjas.com/v1/facts?limit=${count}`, {
      headers: {
        'X-Api-Key': process.env.NINJA_API_KEY
      }
    })

    return data
  } catch(err) {
    logger.error(`[NINJA_API_ERROR] - ${err}`)
  }
}

// Post the random fact on the facebook page
async function postRandomFact(fact) {
  try {
    await axios.post(`https://graph.facebook.com/${process.env.FB_PAGE_ID}/feed?message=${fact}&access_token=${process.env.FB_PAGE_ACCESS_TOKEN}`)
  } catch(err) {
    logger.error(`[FB_API_ERROR] - ${err}`)
  }
}

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
