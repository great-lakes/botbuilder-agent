/**
 * @module botbuilder-agent
 */

import { DirectLine } from 'botframework-directlinejs'

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


function makeDirectlineClient = (secret?: string) {
  if (!secret) {
    // make offline directline
  }
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
