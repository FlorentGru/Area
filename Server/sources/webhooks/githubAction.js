'use strict';
const GitHub = require("github-api");
const Promise = require("es6-promise").Promise;

const mongoose = require('mongoose');
const User = mongoose.model('User');
const AccessTokens = mongoose.model('AccessTokens');
const AreActions = mongoose.model('AreActions');

const eventEmitter = require('../webhooks/eventEmitter');
const listener = require('../webhooks/eventListener');

exports.createWebhook = async function (userId, action) {

    const tokens = await AccessTokens.fetchAccessToken(userId, "github");
    if (!tokens) {
        console.log("user not connected to service");
        return;
    }
    console.log(tokens);
    const token = tokens.accessToken;

    const event = action.name;
    if (event !== "pullRequest" && event !== "push") {
        console.log("invalid action name");
        return;
    }

    const param1 = action.params.find(({ name }) => name === 'repo');
    const param2 = action.params.find(({ name }) => name === 'owner');
    if (!param1 || !param2) return;

    const repo = param1.value;
    const owner = param2.value;

    let eventType = "push";
    if (event === "pullRequest")
        eventType = "pull_request";

    console.log(`token: ${token}`);
    console.log(`event: ${event}`);
    console.log(`repo: ${repo}`);
    console.log(`owner: ${owner}`);
    console.log(`endpoint: ${process.env.SERVER_ADDRESS}/webhook/github/pullRequest`);

    const gh = new GitHub({
        token: token
    });
    const fork = gh.getRepo(owner, repo);
    const hookDef = {
        "name" : "web",
        "config" : {
            "url" : `${process.env.SERVER_ADDRESS}/webhook/github/${event}`,
            "content_type": "json",
            "insecure_ssl": "0"
        },
        "events" : [eventType],
        "active" : true
    };
    fork.createHook(hookDef)
        .then(function({data: hook}) {
            console.log("A web hook has been created which will trigger on push or pull request events...");
        });
};

exports.trigger = function(repo, owner, event) {
    AreActions.aggregate([
        {
            "$project": {
                "userId": 1,
                "areas": 1
            }
        },
        { "$unwind": "$areas" },
        { "$match": { "areas.action.service": "github"}}
    ], function (err, res) {
        if (err)
            throw err;
        res.forEach(function(area) {
            console.log("github action: " + area.areas.action.name);
            if (area.areas.action.name === event) {
                checkParams(repo, owner, area);
            }
        });
    });
};

const checkParams = function (repo, owner, area) {
    const param1 = area.areas.action.params.find(({ name }) => name === 'owner');
    const param2 = area.areas.action.params.find(({ name }) => name === 'repo');

    if (!param1 || !param2) return;

    if (param1.value === owner && param2.value === repo) {
        eventEmitter.emit('react', area.userId, area.areas.reaction);
    }
};