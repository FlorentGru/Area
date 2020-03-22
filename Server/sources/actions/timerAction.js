'use strict';

const eventEmitter = require('../webhooks/eventEmitter');
const listener = require('../webhooks/eventListener');

exports.act = async function(userId, action, reaction) {
    const hours = action.params.find(({ name }) => name === 'hours');
    const minutes = action.params.find(({ name }) => name === 'minutes');
    const message = action.params.find(({ name }) => name === 'message');
    if (!hours || !minutes || !message) {
        console.log("missing parameter");
        return;
    }
    const time = parseInt(hours.value) * 3600 + parseInt(minutes.value) * 60 * 1000;

    if (hours.value === 0 && minutes.value === 0) return;

    if (action.name === "countdown") {
        setTimeout(function() {
            console.log(`countdown of ${time} milliseconds finished`);
            eventEmitter.emit("react", userId, reaction, message.value);
        }, time);
    }
    if (action.name === "loop") {
        setInterval(function() {
            console.log(`loop of ${time} milliseconds tick`);
            eventEmitter.emit("react", userId, reaction, message.value);
        }, time);
    }
};