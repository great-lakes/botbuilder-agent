# botbuilder-agent

## Usage
```js
// import
import { makeAgent } from 'botbuilder-agent'

// instantiate agent with DirectLine secret
const agent = makeAgent('directlineSecretString')

// make asynchronous calls with agents
agent(callPromise)
```