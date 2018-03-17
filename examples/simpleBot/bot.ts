import { Bot, MemoryStorage, BotStateManager } from 'botbuilder'
import { BotFrameworkAdapter } from 'botbuilder-services'
import * as fetch from 'node-fetch'
const restify = require('restify')
let server = restify.createServer()
server.listen(process.env.port || 3978, () => {
  console.log(`${server.name} listening to ${server.url}`)
})

// Create connector
const adapter = new BotFrameworkAdapter(
  { appId: process.env.MICROSOFT_APP_ID, appPassword: process.env.MICROSOFT_APP_PASSWORD }
)

server.post('/api/messages', adapter.listen())

// botbuilder-agent
import { makeAgent, ResponseObject } from '../../src'
makeAgent('{DirectLineSecret}')

const asynchronous = () => {
  return new Promise((resolve, reject) => {
    resolve
  })
}

new Bot(adapter)
    .use(new MemoryStorage())
    .use(new BotStateManager())
    .onReceive((context: BotContext) => {
      try {
        if (context.request.type !== 'message') {
          return
        }

        const message = context.request.text
        context.reply(message)

      } catch (err) {
        console.error(err)
      }
    })
 