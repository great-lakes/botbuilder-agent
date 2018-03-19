require('dotenv').config()
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
const agent = makeAgent({directlineSecret: undefined, botUrl: 'http://localhost:3978/api/messages', offline: true})

const asynchronousPromise = () : Promise<ResponseObject> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({message: 'hello from agent'})
    }, 1000)
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

        if (context.request.from.id === 'agent') {
          context.reply(context.request.text)
          return
        }

        const message = context.request.text
        context.reply(message)

        if (message[0] === 'k') {
          agent(asynchronousPromise)
        }

      } catch (err) {
        console.error(err)
      }
    })
 