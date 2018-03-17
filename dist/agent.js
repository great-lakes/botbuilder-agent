"use strict";
/**
 * @module botbuilder-agent
 */
Object.defineProperty(exports, "__esModule", { value: true });
const botframework_directlinejs_1 = require("botframework-directlinejs");
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
const startOfflineDirectline = (botUrl = '') => {
    const domain = 'http://127.0.0.1:3000';
    const directline = require('offline-directline');
    const express = require('express');
    const app = express();
    directline.initializeRoutes(app, domain, botUrl);
    return `${domain}/v3/directline`;
};
function makeAgent({ directlineSecret, botUrl = 'http://localhost:3978/api/messages' }) {
    const directlineConfig = {
        secret: directlineSecret
    };
    if (!directlineSecret) {
        directlineConfig.domain = startOfflineDirectline(botUrl);
    }
    const directLine = new botframework_directlinejs_1.DirectLine(directlineConfig);
    return (call) => {
        call().then((responseObj) => {
            directLine.postActivity({
                from: { id: 'agent', name: 'wolf' },
                type: 'message',
                text: responseObj.message
            });
        });
    };
}
exports.makeAgent = makeAgent;
//# sourceMappingURL=agent.js.map