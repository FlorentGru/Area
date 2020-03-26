'use strict';

const express = require('express');
const auth = require('../middleware/JWTAuth');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const AccessTokens = mongoose.model('AccessTokens');

const dropboxA = require("../actions/dropboxAction");

const router = express.Router();

const oauth = require('../services/tokenService');

const dropboxV2Api = require('dropbox-v2-api');
let dropbox = dropboxV2Api.authenticate({
    client_id: process.env.DROPBOX_CLIENT_ID,
    client_secret: process.env.DROPBOX_CLIENT_SECRET,
    redirect_uri: `${process.env.SERVER_ADDRESS}/oauth2/dropbox/callback`
});

/**
 * Authenticate for dropbox
 * @route GET /oauth2/dropbox
 * @operationId dropboxAuth
 * @group OAuth2 - service authentications
 * @security JWT
 * @param {string} callback.query.required
 * @returns {string} 200 - redirect Url
 * @returns {Error} 401 - Unauthorized
 */
router.get('/oauth2/dropbox', auth, async (req, res) => {
    try {
        const callback = req.query.callback;
        if (!callback) throw ("missing callback");

        dropbox = dropboxV2Api.authenticate({
            client_id: process.env.DROPBOX_CLIENT_ID,
            client_secret: process.env.DROPBOX_CLIENT_SECRET,
            redirect_uri: `${process.env.SERVER_ADDRESS}/oauth2/dropbox/callback`,
        });

        console.log(`dropbox redirect: ${process.env.SERVER_ADDRESS}/oauth2/dropbox/callback`)

        res.status(200).send({data: dropbox.generateAuthUrl() + `&state=${req.user.id.toString()}%20${callback}`});
    } catch (err) {
        res.status(400).send({error: err});
    }
});

router.get('/oauth2/dropbox/callback', async function(req, res) {
    try {
        const params = req.query;
        await dropbox.getToken(params.code, async function (err, result) {
            if (err) throw ("error fetching token");

            console.log('dropbox user\'s access_token: ', result.access_token);

            if (!params.state) throw ("fetch access token failed dropbox");
            const state = params.state.split(" ");
            const userId = state[0];
            const callback = state[1];
            const token = result.access_token;
            const service = "dropbox";

            console.log(`userId: ${userId}`);

            await dropboxA.getAccountId(token, async (accountId, cursor) => {
                const accountInfos = accountId + " " + cursor;

                console.log(`infos: ${accountInfos}`);
                await oauth.updateToken(userId, token, accountInfos, service);
                res.redirect(callback);
            });
        });
    } catch (err) {
        res.status(400).send({error: err});
    }
});

module.exports = router;