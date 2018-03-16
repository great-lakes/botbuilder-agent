/**
 * @module botbuilder-agent
 */

import fetch from 'node-fetch'
import { DirectLine } from 'botframework-directlinejs'

// Interface Options:
// OPTION 1: User pases in function which returns a promise (resolves the message string(s))
// OPTION 1: Pro - user defines how to handle resonse object and parse (probably best this way)

// OPTION 2: User passes in payload and endpoint and we construct a fetch call
// OPTION 2: Pro - allows us to control the call library

var directLine = new DirectLine({
  secret: '/* put your Direct Line secret here */',
  token: '/* or put your Direct Line token here (supply secret OR token, not both) */'
})

// TODO: delete temp (result should be captured in promise chain)
const responseString = 'response string'

export function makeCall (context: any, /* call: () => {} */) {

  // TODO: delete mock function: user passes in function to call
  const call = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('response string')
      }, 3000)
    })
  }

  call().then((/* resoponseString */) => {
    directLine.postActivity({
      from: { id: 'myUserId', name: 'myUserName' }, // required (from.name is optional)
      type: 'message',
      text: responseString
    })
  })
}