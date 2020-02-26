'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const AccessTokens = mongoose.model('AccessTokens');
const AreActions = mongoose.model('AreActions');

const emitter = require('./eventEmitter');

const githubA = require('./githubAction');
const discordR = require('../services/discordReaction');
const discordA = require('../webhooks/discordAction');

emitter.on('webhook', async function(userId, action) {
    if (action.service === 'discord') {
        discordA.restart();
    }
    if (action.service === 'github') {
        githubA.createWebhook(userId, action);
    }
});

emitter.on('react', async function(userId, reaction) {
    if (reaction.service === "discord") {
        discordR.react(reaction);
    }
});

emitter.on('push', async function(body) {
    const repo = body.repository.name;
    const owner = body.repository.owner.name;
    const event = "push";

    if (!body.hook) {
        github.trigger(repo, owner, event)
    }
});

emitter.on('pullRequest', async function(body) {
    const repo = body.repository.name;
    const owner = body.repository.owner.name;
    const event = "push";

    if (!body.action) return;

    if (body.action === 'opened') {
        github.trigger(repo, owner, event);
    }
});