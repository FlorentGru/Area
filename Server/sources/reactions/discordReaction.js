'use strict';

const Axios = require('axios');
const Discord = require('discord.js');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const AccessTokens = mongoose.model('AccessTokens');

const sendMessage = function(webhookId, webhookToken, content) {
    const hook = new Discord.WebhookClient(webhookId, webhookToken);
    hook.send(content);
};

exports.react = function(reaction, param) {
    if (reaction.name === "message") {
        const param1 = reaction.params.find(({ name }) => name === 'webhookUrl');
        //const param1 = reaction.params.find(({ name }) => name === 'webhookId');
        //const param2 = reaction.params.find(({ name }) => name === 'webhookToken');
        if (!param1) return console.log("wrong parameter");

        if (!param || param.isEmpty) {
            param = "No content specified."
        }
        const webhookUrl = param1.value.split("/");
        const length = webhookUrl.length;

        const webhookId = webhookUrl[length - 2];
        const webhookToken = webhookUrl[length - 1];

        console.log("send message");
        sendMessage(webhookId, webhookToken, param);
    }
};