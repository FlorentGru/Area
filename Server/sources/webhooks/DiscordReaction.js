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

exports.react = async function(reaction) {
    if (reaction.service === "discord" && reaction.name === "message") {

        const param1 = reaction.params.find(({ name }) => name === 'webhookId');
        const param2 = reaction.params.find(({ name }) => name === 'webhookToken');
        const param3 = reaction.params.find(({ name }) => name === 'content');

        if (!param1 || !param2 || !param3) {
            return;
        }
        console.log("send message");
        sendMessage(param1.value, param2.value, param3.value);
    }
};



    /*axios.post(`https://discordapp.com/api/webhooks/${webhookId}/${webhookToken}`, {
        content: content
    }, {
        headers: {
            Authorization: `Bearer ${serviceTokens.accessToken}`
        }
    })
        .then((res) => {
            console.log(`statusCode: ${res.status}`)
            //console.log(res)
        })
        .catch((error) => {
            console.error(error)
        })
};*/