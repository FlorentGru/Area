'use strict';

const Discord = require('discord.js');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const AccessTokens = mongoose.model('AccessTokens');
const AreActions = mongoose.model('AreActions');

const eventEmitter = require('../webhooks/eventEmitter');
const listener = require('../webhooks/eventListener');

let client = new Discord.Client();

client.on("ready", () => {
    console.log('bot ready');
    trigger();
});

client.login('NjczODc4ODcyMjAyNDEyMDMz.XlPipg.0Rgg9yjhEu--NRl8tqeL8jsxB0M');

const restart = function () {
    client.destroy().then(() => {
        client = new Discord.Client();
        client.on("ready", () => {
            console.log('bot ready');
            trigger();
        });
        client.login('NjczODc4ODcyMjAyNDEyMDMz.XlPipg.0Rgg9yjhEu--NRl8tqeL8jsxB0M');
    });
};
exports.restart = restart;

const trigger = function () {
    AreActions.aggregate([
        {
            "$project": {
                "_id": 1,
                "areas": 1
            }
        },
        { "$unwind": "$areas" },
        { "$match": { "areas.action.service": "discord"} },
    ], function (err, res) {
        if (err)
            throw err;
        res.forEach(function(area) {
            console.log("discord action: " + area.areas.action.name);
            if (area.areas.action.name === 'received') {
                message(area)
            }
        });
    });
};
exports.triggers = trigger;

const message = function (area) {
    if (area.areas.action.params.length !== 3) {
        console.log(`wrong number of parameters, expected: 3`)
        return;
    }

    const param1 = area.areas.action.params.find(({ name }) => name === 'server');
    const param2 = area.areas.action.params.find(({ name }) => name === 'channel');
    const param3 = area.areas.action.params.find(({ name }) => name === 'startWith');
    if (!param1 || !param2 || !param3) {
        console.log("wrong parameters")
        return;
    }

    client.on('message', message => {
        // Ignore messages that aren't from a guild
        if (!message.guild) return;

        if (message.author.bot) return;

        console.log(`Guild: ${message.guild.name}`);
        console.log(`Expected: ${param1.value}`);
        if (message.guild.name !== param1.value) {
            console.log("wrong server")
            return;
        }

        const channel = message.guild.channels.find(channel => channel.name === param2.value);
        if (!channel || channel.id !== message.channel.id) {
            console.log("wrong channel");
            return;
        }
        console.log(`Channel: ${channel.name}`);
        console.log(`Expected: ${param2.value}`);

        if (message.content.startsWith(param3.value)) {
            console.log(`triggered by ${message.content}`);
            console.log(`Expected: ${param3.value}`);
            eventEmitter.emit('react', area.userId, area.areas.reaction);
        }
    });
};
