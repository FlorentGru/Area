'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const AccessTokens = mongoose.model('AccessTokens');
const AreActions = mongoose.model('AreActions');

const emitter = require('./eventEmitter');

const githubA = require('./githubAction');
const discordR = require('../services/discordReaction');
const discordA = require('../webhooks/discordAction');
const gmailR = require('../services/gmailReaction');

emitter.on('webhook', async function(userId, action) {
    if (action.service === 'discord') {
        discordA.restart();
    }
    if (action.service === 'github') {
        await githubA.createWebhook(userId, action);
    }
});

emitter.on('react', async function(userId, reaction) {
    if (reaction.service === "discord") {
        console.log("react discord");
        discordR.react(reaction);
    }
    if (reaction.service === 'gmail') {
        await gmailR.react(reaction);
    }
});

emitter.on('push', async function(body) {
    const repo = body.repository.name;
    const owner = body.repository.owner.name;
    const event = "push";

    if (!body.hook) {
        githubA.trigger(repo, owner, event)
    }
});

emitter.on('pullRequest', async function(body) {
    const repo = body.repository.name;
    const owner = body.repository.owner.name;
    const event = "push";

    if (!body.action) {
        return;
    }

    if (body.action === 'opened') {
        github.trigger(repo, owner, event);
    }
});