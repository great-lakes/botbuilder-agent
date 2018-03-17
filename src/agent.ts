/**
 * @module botbuilder-agent
 */

import { DirectLine } from 'botframework-directlinejs'

/**
 * Interface Promise should resolve
 * 
 */
export interface ResponseObject {
  message: string
}

/**
 * Initialize agent with DirectLine secret to make calls
 * 
 * **Usage Example**
 *
 * ```js
 * import { makeAgent } from 'botbuilder-agent'
 * 
 * // initialize agent
 * const agent = makeAgent('{DirectLineSecret}')
 * // create Promise make asynchronous call
 * agent(callPromise)
 * ```
 * @param secret - DirectLine secret
 */

function makeDirectlineClient = (secret?: string) {
  if (!secret) {
    // make offline directline
  }
}

export function makeAgent (secret: string) {
  const directLine = new DirectLine({secret})

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
