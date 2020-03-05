'use strict';

const GitHub = require("github-api");
const Promise = require("es6-promise").Promise;

const mongoose = require('mongoose');
const AccessTokens = mongoose.model('AccessTokens');

exports.react = async function(userId, reaction, param) {
    if (reaction.name === "issue") {
        const tokens = await AccessTokens.fetchAccessToken(userId, "github");
        if (!tokens) {
            return;
        }
        const token = tokens.accessToken;

        const param1 = reaction.params.find(({ name }) => name === 'repo');
        const param2 = reaction.params.find(({ name }) => name === 'owner');
        if (!param1 || !param2) {
            return;
        }

        await createIssue(token, param1.value, param2.value, param);
    }
};

const createIssue = async function (token, repo, owner, title) {
    const gh = new GitHub({
        token: token
    });

    if (!title || title.isEmpty) {
        title = "Issue";
    }

    const fork = gh.getIssues(owner, repo);
    const issueDef = {
        "title": title,
        "body": "Issue created by Area",
        "assignees": [],
        "labels": []
    };
    await fork.createIssue(issueDef)
        .then(function({data: hook}) {
            console.log("Issue created");
        }).catch((error) => {
            console.error(error.response.data);
        });
};