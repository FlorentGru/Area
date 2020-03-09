'use strict';

const emitter = require('./eventEmitter');

const slackR = require('../services/slackReaction');
const githubR = require('../services/githubReaction');
const githubA = require('./githubAction');
const discordR = require('../services/discordReaction');
const discordA = require('../webhooks/discordAction');
const mailR = require('../services/mailReaction');
const spotifyR = require('../services/spotifyReaction');
const dropboxA = require('./dropboxAction');
const timer = require('./timerAction');

emitter.on('webhook', async function(userId, action, reaction) {

    if (action.service === 'discord') {
        discordA.restart();
    }
    if (action.service === 'github') {
        await githubA.createWebhook(userId, action);
    }
    if (action.service === 'dropbox') {
    }
    if (action.service === 'timer') {
       await timer.act(userId, action, reaction);
    }
});

emitter.on('react', async function(userId, reaction, param) {
    if (reaction.service === "discord") {
        console.log("react discord");
        discordR.react(reaction, param);
    } else if (reaction.service === 'zoho' || reaction.service === 'gmail') {
        console.log("mail reaction");
        await mailR.react(reaction, param);
    } else if (reaction.service === 'github') {
        console.log("github reaction");
        await githubR.react(userId, reaction, param);
    } else if (reaction.service === 'slack') {
        console.log('slack reaction');
        await slackR.react(userId, reaction, param);
    } else if (reaction.service === 'spotify') {
        console.log('spotify reaction');
        await spotifyR.react(userId, reaction, param);
    }
});

emitter.on('dropbox', async function(body) {
    const accoundId = body.list_folder.accounts[0];

    dropboxA.updateActions(accoundId);
});

emitter.on('github', async function(body, event) {
    const repo = body.repository.name;
    const owner = body.repository.owner.name;
    if (!repo || !owner) return console.log("Error getting repo data");

    if (event === 'push') {
        if (!body.hook) {
            const author = body.pusher.name;
            const message = `${author} pushed on ${owner}/${repo}`;

            githubA.trigger(repo, owner, event, message);
        }
    } else if (event === 'pullRequest') {
        if (!body.action) return;

        if (body.action === 'opened') {
            const title = body.pull_request.title;
            const author = body.pull_request.user.login;
            const message = `Pull request named ${title} opened by ${author} on ${owner}/${repo}`;

            githubA.trigger(repo, owner, event, message);
        }
    }
});