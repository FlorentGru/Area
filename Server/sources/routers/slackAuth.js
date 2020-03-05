'use strict';

const express = require('express');
const auth = require('../middleware/JWTAuth');

const fetch = require('node-fetch');
const btoa = require('btoa');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const AccessTokens = mongoose.model('AccessTokens');

const router = express.Router();

const oauth = require('../services/tokenService');


/**
 * Authenticate for slack
 * @route GET /oauth2/slack
 * @operationId slackAuth
 * @group OAuth2 - service authentications
 * @security JWT
 * @param {string} callback.query.required
 * @returns {string} 200 - redirect Url
 * @returns {Error} 401 - Unauthorized
 */
router.get('/oauth2/slack', auth, async (req, res) => {
    const callback = req.query.callback;
    if (!callback) {
        res.status(400).send({error: "missing query"});
        return;
    }

    let redirect = encodeURIComponent(`${process.env.SERVER_ADDRESS}/oauth2/slack/callback`);
    let url = `https://slack.com/oauth/authorize?scope=incoming-webhook&client_id=${process.env.SLACK_CLIENT_ID}&state=${callback}&redirect_uri=${redirect}`;
    res.status(200).send({data: url});
});

router.get('/oauth2/slack/callback', async (req, res) => {
    try {
        if (!req.query.code) throw ('NoCode was Provided');
        const code = req.query.code;
        const state = req.query.state;

        let redirect = encodeURIComponent(`${process.env.SERVER_ADDRESS}/oauth2/discord/callback`);

        const creds = btoa(`${process.env.SLACK_CLIENT_ID}:${process.env.SLACK_CLIENT_SECRET}`);
        const response = await fetch(` https://slack.com/api/oauth.access?code=${code}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${creds}`,
                },
            });
        const json = await response.json();
        console.log(json.incoming_webhook);
        res.redirect(`${state}?hook=${json.incoming_webhook.url}`)
    } catch (err) {
        res.status(400).send({error: err});
    }
});

module.exports = router;