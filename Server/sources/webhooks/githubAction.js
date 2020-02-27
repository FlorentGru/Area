'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const AccessTokens = mongoose.model('AccessTokens');
const AreActions = mongoose.model('AreActions');

const eventEmitter = require('../webhooks/eventEmitter');
const listener = require('../webhooks/eventListener');

exports.createWebhook = function (userId, action) {

    const tokens = AccessTokens.fetchAccessToken(userId, "github");
    if (!token) {
        console.log("user not connected to service");
        return;
    }

    const username = tokens.accessToken;
    const password = tokens.refreshToken;
    const event = action.name;
    if (event !== "pullRequest" && event !== "push") {
        console.log("invalid action name");
        return;
    }
    const repo = action.params.find(({ name }) => name === 'repo');
    if (!repo) return;

    const GitHub = require("github-api");
    const Promise = require("es6-promise").Promise;
    let eventType = "push";

    if (event === "pullRequest")
        eventType = "pull_request";

    const gh = new GitHub({
        username: username,
        password: password
    });
    const fork = gh.getRepo(username, repo);
    const hookDef = {
        "name" : "web",
        "active" : true,
        "events" : [eventType],
        "config" : {
            "url" : "https://a6e4fd9a.ngrok.io/webhook/github/pullRequest",
            "content_type": "json",
            "insecure_ssl": "0"
        }
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
    if (area.areas.action.nbrParam !== 2) return;

    const param1 = area.action.params.find(({ name }) => name === 'owner');
    const param2 = area.action.params.find(({ name }) => name === 'repo');

    if (!param1 || !param2) return;

    if (param1.value === owner && param2.value === repo) {
        eventEmitter.emit('react', area.userId, area.areas.reaction);
    }
};