'use strict';

const express = require('express');
const auth = require('../middleware/JWTAuth');

const fetch = require('node-fetch');
const btoa = require('btoa');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const AccessTokens = mongoose.model('AccessTokens');

const router = express.Router();

const oauth = require('../models/updateToken');


/**
 * Authenticate for discord
 * @route GET /oauth2/discord
 * @operationId discordAuth
 * @group OAuth2 - service authentications
 * @security JWT
 * @param {boolean} bot.query.required
 * @param {boolean} webhook.query.required
 * @param {string} callback.query.required
 * @returns {string} 200 - redirect Url
 * @returns {Error} 401 - Unauthorized
 */
router.get('/oauth2/discord', auth, async (req, res) => {
    const bot = req.query.bot;
    const webhook = req.query.webhook;
    const callback = req.query.callback;
    let redirect = encodeURIComponent(`${process.env.SERVER_ADDRESS}/oauth2/discord/callback`);
    if ((!bot && !webhook) || !callback) {
        res.status(400).send({error: "Missing parameters"});
    } else {
        let url = "";
        if ((webhook === "false") && (bot === "true")) {
            url = `https://discordapp.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&permissions=65600&redirect_uri=${redirect}&response_type=code&scope=bot&state=${callback}`;
        } else if (bot === "false" && webhook === "true") {
            url = `https://discordapp.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&permissions=65600&redirect_uri=${redirect}&response_type=code&scope=webhook.incoming&state=${callback}`;
        } else {
            url = `https://discordapp.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&permissions=65600&redirect_uri=${redirect}&response_type=code&scope=webhook.incoming%20bot&state=${callback}`;
        }
        res.status(200).send({url});
    }
});

router.get('/oauth2/discord/callback', async (req, res) => {
    try {
        if (!req.query.code) throw ('NoCodeProvided');
        const code = req.query.code;
        const state = req.query.state;

        let redirect = encodeURIComponent(`${process.env.SERVER_ADDRESS}/oauth2/discord/callback`);

        const creds = btoa(`${process.env.DISCORD_CLIENT_ID}:${process.env.DISCORD_CLIENT_SECRET}`);
        const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${creds}`,
                },
            });
        const json = await response.json();
        if (!json.webhook) {
            res.redirect(state);
        } else {
            res.redirect(`${state}?webhookId=${json.webhook.id}&webhookToken=${json.webhook.token}`)
        }
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;