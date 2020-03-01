'use strict';

const express = require('express');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const AccessTokens = mongoose.model('AccessTokens');

const eventEmitter = require('./eventEmitter');
const listener = require('./eventListener');

/*export async function alarm_clock(hours, minutes) {
    if (!Number.isInteger(Hours) || !Number.isInteger(Minutes) || Hours < 0 || Hours > 24 || Minutes < 0 || Minutes > 59)
        return("Error: Wrong date and minutes");
    let date = new Date(Date.now());
    let _hours = date.getHours();
    let _minutes = date.getMinutes();
        return("Test: " + _hours + " : " + _minutes);
    if (_hours === Hours && _minutes === Minutes) {
        return("OK: Conditions Passed");
    } else {
        return("OK: Condition not passed");
    }
}

export async function countdown_loop(hours, minutes) {
    var seconds = hours * 3600 + minutes * 60;

    for (let i = 0; i < 1000; i++) {
        setInterval(await (seconds = countdown(seconds)), 1000);
    }
}

export async function countdown(seconds) {
    setInterval((seconds = decrement(seconds)), 1000);
    if (seconds === 0) {
        return("ok: fin timer");
    } else {
        return (--seconds);
    }
}

function decrement(second) {
    if (second === 0) {
        return ("OK: Fin Timer");
    } else {
        return (--second);
    }
}*/

exports.act = async function(userId, action, reaction) {
    const hours = action.params.find(({ name }) => name === 'hours').value;
    const minutes = action.params.find(({ name }) => name === 'minutes').value;
    const message = action.params.find(({ name }) => name === 'message').value;
    if (!hours || !minutes || !message) {
        console.log("missing parameter");
        return;
    }
    const time = parseInt(hours) * 3600 + parseInt(minutes) * 60 * 1000;

    if (action.name === "countdown") {
        setTimeout(function() {
            console.log(`countdown of ${time} milliseconds finished`);
            eventEmitter.emit("react", userId, reaction, message);
        }, time);
    }
    if (action.name === "loop") {
        setInterval(function() {
            console.log(`loop of ${time} milliseconds tick`);
            eventEmitter.emit("react", userId, reaction, message);
        }, time);
    }
};