'use strict';

const Discord = require('discord.js');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const AccessTokens = mongoose.model('AccessTokens');
const AreActions = mongoose.model('AreActions');

const eventEmitter = require('../webhooks/eventEmitter');
const listener = require('../webhooks/eventListener');

const client = new Discord.Client();

exports.triggers = function () {
    client.on('ready', () => {
        console.log('I am ready!');
    });

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
            if (area.action.service !== 'discord')
                return;
            if (area.action.name === 'received') {
                message(area)
            }
        });
    })


};



const message = function (area) {
    if (area.action.nbrParams !== 3)
        return;

    const param1 = area.action.params.findOne({name: "server"});
    const param2 = area.action.params.findOne({name: "channel"});
    const param3 = area.action.params.findOne({name: "startWith"});
    if (!param1 || !param2 || !param3) {
        return;
    }

    client.on('message', message => {
        // Ignore messages that aren't from a guild
        if (!message.guild) return;

        if (message.guild.name !== param1.value) return;

        const channel = message.member.guild.channels.find('name', param2.value);
        if (!channel)
            return;

        if (message.content.startsWith(param3.value)) {
            eventEmitter.emit('pubsub', area.userId, area.reaction);
        }
    });

};
