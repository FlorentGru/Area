'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const AccessTokens = mongoose.model('AccessTokens');
const AreActions = mongoose.model('AreActions');

const emitter = require('./eventEmitter');

const githubR = require('../services/githubReaction');
const githubA = require('./githubAction');
const discordR = require('../services/discordReaction');
const discordA = require('../webhooks/discordAction');
const mailR = require('../services/mailReaction');
const dropboxA = require('./dropboxAction');

emitter.setMaxListeners(0);

emitter.on('webhook', async function(userId, action) {

    if (action.service === 'discord') {
        discordA.restart();
    }
    if (action.service === 'github') {
        await githubA.createWebhook(userId, action);
    }
    if (action.service === 'dropbox') {
    }
});

emitter.on('react', async function(userId, reaction, param) {
    if (reaction.service === "discord") {
        console.log("react discord");
        discordR.react(reaction, param);
    } else if (reaction.service === 'outlook' || reaction.service === 'gmail') {
        console.log("mail reaction");
        await mailR.react(reaction, param);
    } else if (reaction.service === 'github') {
        console.log("github reaction");
        await githubR.react(userId, reaction, param);
    }
});

emitter.on('dropbox', async function(body) {
    const accoundId = body.list_folder.accounts[0];

    dropboxA.updateActions(accoundId);
});

emitter.on('push', async function(body) {
    const repo = body.repository.name;
    const owner = body.repository.owner.name;
    const event = "push";

    console.log(body);

    if (!body.hook) {
        const author = body.pusher.name;
        const message = author + " pushed on " + owner + "/" + repo;

        githubA.trigger(repo, owner, event, message);
    }
});

emitter.on('pullRequest', async function(body) {
    const repo = body.repository.name;
    const owner = body.repository.owner.name;
    const event = "pullRequest";

    if (!body.action) {
        return;
    }

    console.log(body);

    if (body.action === 'opened') {
        const title = body.pull_request.title;
        const author = body.pull_request.user.login;
        const message = "Pull request named " + title + " opened by " + author + " on " + owner + "/" + repo;

        githubA.trigger(repo, owner, event, message);
    }
});