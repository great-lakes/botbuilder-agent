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
const agent = makeAgent({directlineSecret: undefined, botUrl: 'http://localhost:8000/api/messages', offline: true})

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

        const configuredAgent = agent(context.conversationReference)
        if (context.request.value && context.request.value.name === 'botbuilder-agent') {
          context.conversationReference = context.request.value.convo
          context.reply(context.request.text)
          return
        }

        const message = context.request.text
        context.reply(message)

        if (message[0] === 'k') {
          configuredAgent(asynchronousPromise)
        }

      } catch (err) {
        console.error(err)
      }
    })
 