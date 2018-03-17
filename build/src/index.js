/**
 * @module botbuilder-agent
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "botframework-directlinejs"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const botframework_directlinejs_1 = require("botframework-directlinejs");
    /**
     * Interface Options:
     * OPTION 1: User pases in function which returns a promise (resolves the message string(s))
     * OPTION 1: Pro - user defines how to handle resonse object and parse (probably best this way)
     *
     * OPTION 2: User passes in payload and endpoint and we construct a fetch call
     * OPTION 2: Pro - allows us to control the call library
     */
    /**
     * Things to decide:
     * - How do we handle this in wolf intake?
     * - Generally, how do users know this directline message is from `agent` to handle accordingly?
     */
    var directLine = new botframework_directlinejs_1.DirectLine({
        secret: '/* put your Direct Line secret here */',
        token: '/* or put your Direct Line token here (supply secret OR token, not both) */'
    });
    // TODO: delete temp (result should be captured in promise chain)
    const responseString = 'response string';
    function makeCall(context) {
        // TODO: delete mock function: user passes in function to call
        const call = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve('response string');
                }, 3000);
            });
        };
        call().then(() => {
            directLine.postActivity({
                from: { id: 'myUserId', name: 'myUserName' },
                type: 'message',
                text: responseString
            });
        });
    }
    exports.makeCall = makeCall;
});
//# sourceMappingURL=index.js.map