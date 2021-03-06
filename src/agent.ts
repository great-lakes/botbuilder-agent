/**
 * @module botbuilder-agent
 */

import fetch from 'node-fetch'
import {ConversationReference} from 'botbuilder-schema'

/**
 * Interface Promise should resolve.
 * 
 * ```js
 * {
 *  message: string
 * }
 * ```
 */
export interface ResponseObject {
  message: string
}

export interface AgentConfig {
  directlineSecret?: string
  botUrl?: string
  offline?: boolean
}

export interface AgentConversationReference {
  channelId: string
  serviceUrl: string
  conversation: Object
  bot: Object
  user: Object
  activityId: string
}

/**
 * Initialize agent with DirectLine secret to make calls.
 * 
 * **Usage Example**
 *
 * ```js
 * import { makeAgent } from 'botbuilder-agent'
 * 
 * // initialize agent
 * const agent = makeAgent('{DirectLineSecret}')
 *
 * // create Promise make asynchronous call
 * agent(callPromise)
 * ```
 * @param secret - DirectLine secret
 */

const startOfflineDirectline = (botUrl: string = ''): string => {
  const domain: string = 'http://127.0.0.1:3000'
  const directline = require('offline-directline')
  const express = require('express')

  const app = express();
  directline.initializeRoutes(app, domain, botUrl)
  return `${domain}/v3/directline`
}

export function makeAgent ({directlineSecret, botUrl = 'http://localhost:3978/api/messages', offline}: AgentConfig) {
  // const directlineConfig: DirectLineOptions = {
  //   secret: directlineSecret
  // }

  // // if (offline) {
  //   directlineConfig.domain = startOfflineDirectline(botUrl)
  // // }

  startOfflineDirectline(botUrl)

  // const directLine: DirectLine = new DirectLine(directlineConfig)

  return (conversationReference: Partial<ConversationReference>) => (call: () => Promise<ResponseObject>) => {
    call()
      .then((responseObj) => {
        const BOT_ENDPOINT = `http://127.0.0.1:3000/directline/conversations/${conversationReference.conversation.id}/activities`
        const messageActivity = {
          type: 'message',
          from: {
              id: conversationReference.user ? conversationReference.user.id || 'default-user' : 'default-user',
              name: conversationReference.user ? conversationReference.user.name || 'User' : 'User'
          },
          text: responseObj.message,
          value: {
            name: 'botbuilder-agent',
            convo: conversationReference
          }
        }

        fetch(BOT_ENDPOINT, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(messageActivity)
        })
          .then(res => {
            return res.json()
          })
          .then(data => console.log('got from the bot:', data))

    })
  }
}
