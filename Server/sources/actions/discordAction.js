'use strict';

const Discord = require('discord.js');

const mongoose = require('mongoose');
const Area = mongoose.model('Area');

const eventEmitter = require('../webhooks/eventEmitter');
const listener = require('../webhooks/eventListener');

let client = new Discord.Client();

client.on("ready", () => {
    console.log('bot ready');
    trigger();
});

client.login(process.env.DISCORD_BOT_SECRET);

const restart = function () {
    client.destroy().then(() => {
        client = new Discord.Client();
        client.on("ready", () => {
            console.log('bot ready');
            trigger();
        });
        client.login(process.env.DISCORD_BOT_SECRET);
    });
};
exports.restart = restart;

const trigger = function () {
/*    Area.find({}, function (err, areas) {
        areas.forEach(function(area) {
            console.log(area)
        });
    });*/

    client.on('message', message => {
        if (!message.guild) return;
        if (message.author.bot) return;

        Area.aggregate([
            {
                "$project": {
                    "userId": 1,
                    "areas": 1
                }
            },
            {"$unwind": "$areas"},
            {"$match": {"areas.action.service": "discord"}},
        ], function (err, res) {
            if (err) throw err;
            res.forEach(function (area) {
            //console.log("discord action: " + area.areas.action.name);
                if (area.areas.action.name === 'message') {
                    isMessage(area, message);
                }
            });
        });
    });
};
exports.triggers = trigger;

const isMessage = function (area, message) {
    const param1 = area.areas.action.params.find(({name}) => name === 'server');
    const param2 = area.areas.action.params.find(({name}) => name === 'channel');
    const param3 = area.areas.action.params.find(({name}) => name === 'startWith');
    if (!param1 || !param2 || !param3) {
        //console.log("wrong parameters")
        return;
    }

//        console.log(`Guild: ${message.guild.name}`);
//        console.log(`Expected: ${param1.value}`);
    if (message.guild.name !== param1.value) {
 //           console.log("wrong server")
        return;
    }

    const channel = message.guild.channels.find(channel => channel.name === param2.value);
    if (!channel || channel.id !== message.channel.id) {
//            console.log("wrong channel");
        return;
    }
//        console.log(`Channel: ${channel.name}`);
//        console.log(`Expected: ${param2.value}`);

    if (message.content.startsWith(param3.value)) {
        const size = param3.value.length + 1;
        eventEmitter.emit('react', area.userId, area.areas.reaction, message.content.substring(size));
    } else {
        console.log("start with was: ", param3.value);
    }
};
