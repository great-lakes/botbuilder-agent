/**
 * @module botbuilder-agent
 */

import { DirectLine, DirectLineOptions } from 'botframework-directlinejs'


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

export function makeAgent ({directlineSecret, botUrl = 'http://localhost:3978/api/messages'}: AgentConfig) {

  const directlineConfig: DirectLineOptions = {
    secret: directlineSecret
  }

  if (!directlineSecret) {
    directlineConfig.domain = startOfflineDirectline(botUrl)
  }

  const directLine: DirectLine = new DirectLine(directlineConfig)

  return (call: () => Promise<ResponseObject>) => {
    call().then((responseObj) => {
      directLine.postActivity({
        from: { id: 'agent', name: 'wolf' },
        type: 'message',
        text: responseObj.message
      })
    })
  }
}
