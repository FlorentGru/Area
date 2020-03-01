'use strict';

const express = require('express');
const auth = require('../middleware/JWTAuth');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const AccessTokens = mongoose.model('AccessTokens');
const AreActions = mongoose.model('AreActions');

const eventEmitter = require('../webhooks/eventEmitter');
const listener = require('../webhooks/eventListener');

const discord = require('../webhooks/discordAction');
const { body, oneOf, validationResult } = require('express-validator');

const fs = require('fs')

const router = express.Router();

router.get('/area/actions', async (req, res) => {
    const actions = [
        {
            service: "discord",
            name: "message",
            params: [
                {
                    name: "server",
                    value: "String"
                },
                {
                    name: "channel",
                    value: "String"
                },
                {
                    name: "startWith",
                    value: "String"
                },
            ]
        },
        {
            service: "discord",
            name: "mention",
            params: [
                {
                    name: "server",
                    value: "String"
                },
                {
                    name: "channel",
                    value: "String"
                }
            ]
        },
        {
            service: "github",
            name: "push",
            params: [
                {
                    name: "owner",
                    value: "String"
                },
                {
                    name: "repo",
                    value: "String"
                }
            ]
        },
        {
            service: "github",
            name: "pullRequest",
            params: [
                {
                    name: "owner",
                    value: "String"
                },
                {
                    name: "repo",
                    value: "String"
                }
            ]
        },
        {
            service: "dropbox",
            name: "delete",
            params: [
            ]
        },
        {
            service: "dropbox",
            name: "created",
            params: [
            ]
        },
        {
            service: "dropbox",
            name: "rename",
            params: [
            ]
        },
        {
            service: "dropbox",
            name: "path change",
            params: [
            ]
        },
    ];

    res.status(200).send(actions);
});

router.get('/area/reactions', async (req, res) => {
    const reactions = [
        {
            service: "discord",
            name: "message",
            params: [
                {
                    name: "webhookId",
                    value: "String"
                },
                {
                    name: "webhookToken",
                    value: "String"
                },
                {
                    name: "content",
                    value: "String"
                },
            ]
        },
        {
            service: "gmail",
            name: "sendTo",
            params: [
                {
                    name: "dest",
                    value: "email"
                },
                {
                    name: "subject",
                    value: "String"
                },
                {
                    name: "content",
                    value: "String"
                },
            ]
        },
        {
            service: "sclack",
            name: "message",
            params: [
                {
                    name: "hookUrl",
                    value: "String"
                },
                {
                    name: "content",
                    value: "String"
                },
            ]
        }
    ];

    res.status(200).send(reactions);
});

/**
 * @typedef Area
 * @property {Action.model} action.required
 * @property {Action.model} reaction.required
 */
/**
* new Action/REAction
* @route POST /area/new
* @operationId newArea
* @group Area - Project Core: Actions and REActions
* @security JWT
* @param {Area.model} area.body.required - new area
* @produces application/json
* @returns {string} 201 - Area created nothing to do
* @returns {string} 200 - discord bot OAuth link (for discord action)
* @returns {string} 300 - discord webhook OAuth link (for discord reaction)
* @returns {Error} 401 - Unauthorized
* @returns {Error} default - Unexpected error
*/
router.post('/area/new', auth, oneOf([
    body('action').exists(),
    body('reaction').exists(),
    body('action.service').exists().isIn(['discord', 'oneDrive', 'messenger', 'github']),
    body('action.name').exists().isAlpha(),
    body('reaction.service').exists().isIn(['discord', 'oneDrive', 'messenger', 'github']),
    body('reaction.name').exists().isAlpha(),
]), async(req, res) => {
    try {
        validationResult(req).throw();

        const action = req.body.action;
        const reaction = req.body.reaction;

        const query = { userId: req.user.id };
        const update = { $push: {
            areas: {
                action: action,
                reaction: reaction
            }
        }};
        await AreActions.findOneAndUpdate(query, update);

        eventEmitter.emit('webhook', req.user.id, action);
        res.status(201).send("Created :)");
    } catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
});

router.get('/about.json', async(req, res) => {
    console.log(req.body);
    let file = fs.readFileSync("sources/about.json")
    let about = JSON.parse(file);
    about.client.host = process.env.SERVER_ADDRESS;
    about.server.current_time = Date.now();
    res.status(200).send(about);
});

module.exports = router;