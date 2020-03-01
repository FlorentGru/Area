'use strict';

const express = require('express');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const AccessTokens = mongoose.model('AccessTokens');

const eventEmitter = require('./eventEmitter');
const listener = require('./eventListener');

exports.act = async function(userId, action, reaction) {
    const hours = action.params.find(({ name }) => name === 'hours');
    const minutes = action.params.find(({ name }) => name === 'minutes');
    const message = action.params.find(({ name }) => name === 'message');
    if (!hours || !minutes || !message) {
        console.log("missing parameter");
        return;
    }
    const time = parseInt(hours.value) * 3600 + parseInt(minutes.value) * 60 * 1000;

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