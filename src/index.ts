/**
 * @module botbuilder-agent
 */

import { DirectLine } from 'botframework-directlinejs'

export interface ResponseObject {
  message: string
}

// USAGE:
// import { makeAgent } from 'botbuilder-agent
// const agent = makeAgent('directlineSecretString')
// agent(callPromise)

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
