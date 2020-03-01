'use strict';

const dropboxV2Api = require('dropbox-v2-api');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const AccessTokens = mongoose.model('AccessTokens');
const AreActions = mongoose.model('AreActions');

const tokenUpdate = require('../models/updateToken');

const eventEmitter = require('../webhooks/eventEmitter');
const listener = require('../webhooks/eventListener');

exports.getAccountId = async function(accessToken, callback) {
    const dropbox = dropboxV2Api.authenticate({
        token: accessToken
    });
    await dropbox({
        resource: 'users/get_current_account'
    }, async (err, result, response) => {
        if (err) { return console.log(err); }

        const res = result.account_id;
        await dropbox({
            resource: "files/list_folder",
            parameters: {
                path: ""
            }
            }, (err, result, response) => {
                if (err) { return console.log(err); }
                const cursor = result.cursor;
                callback(res, cursor);
        });
    });
};

exports.updateActions = function (account) {
    AccessTokens.aggregate([
        { "$project": {
                "userId": 1,
                "tokens": 1 }
        },
        { "$unwind": "$tokens" },
        { "$match": { "tokens.service": "dropbox"} },
    ], function (err, res) {
        if (err) throw err;
        console.log(res);
        res.forEach(function(token) {
            const infos = token.tokens.refreshToken.split(" ");
            const accountId = infos[0];
            const cursor = infos[1];
            const userId = token.userId;
            const accessToken = token.tokens.accessToken;

            if (accountId === account) {
                console.log("a user connected to github");
                isTriggered(accountId, accessToken, cursor, userId);
            }
        });
    });
};

const isTriggered = function (accountId, accessToken, cursor, userId) {
    getAction(accessToken, cursor, function(tag, reactContent, newCursor) {
        AreActions.aggregate([
            {
                "$project": {
                    "userId": 1,
                    "areas": 1
                }
            },
            { "$unwind": "$areas" },
            { "$match": { "userId": userId, "areas.action.service": "dropbox"} },
        ], function (err, res) {
            if (err) throw err;
            res.forEach(function(area) {
                console.log("dropbox action: " + area.areas.action.name);

                if (area.areas.action.name === tag) {
                    eventEmitter.emit('react', area.userId, area.areas.reaction, reactContent);
                }
            });
        });
        tokenUpdate.updateToken(userId, accessToken, accountId + " " + newCursor, "dropbox");
    })
};

const getAction = async function (token, cursor, res) {
    const dropbox = dropboxV2Api.authenticate({
        token: token
    });
    var action='';
    var name='';
    await dropbox({
        resource: 'files/list_folder/continue',
        parameters: {
            "cursor": cursor
        }
    }, (err, result, response) => {
        if (err) { return console.log(err); }
        console.log(result);
        if (result.entries.length === 0) {
            action = 'ERROR';
            name = 'ERROR';
        }
        else if (result.entries.length === 2 && result.entries[0]['.tag'] === 'deleted' && result.entries[1]['.tag'] === 'file') {
            if (result.entries[0].name === result.entries[1].name) {
                action = 'renamed';
                name = result.entries[0].name + ' name changed to ' + result.entries[1].name + " in your Dropbox"
            }
            else {
                action = 'path changed';
                name = result.entries[0].path_lower + ' changed to ' + result.entries[1].path_lower + " in your Dropbox"
            }
        }
        else if (result.entries[0]['.tag'] === 'deleted') {
            action = 'deleted';
            name = result.entries[0].name + ' deleted in your Dropbox'
        }
        else if (result.entries[0]['.tag'] === 'file') {
            action = 'created';
            name = result.entries[0].name + ' created in your Dropbox'
        }
        res(action, name, result.cursor);
    })
};