'use strict';

const express = require('express');
const auth = require('../middleware/JWTAuth');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const AccessTokens = mongoose.model('AccessTokens');

const dropboxA = require("../webhooks/dropboxAction");

const router = express.Router();

const oauth = require('../models/updateToken');

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
 * @returns {string} 200 - redirect Url
 * @returns {Error} 401 - Unauthorized
 */
router.get('/oauth2/dropbox', auth, async (req, res) => {

    dropbox = dropboxV2Api.authenticate({
        client_id: process.env.DROPBOX_CLIENT_ID,
        client_secret: process.env.DROPBOX_CLIENT_SECRET,
        redirect_uri: `${process.env.SERVER_ADDRESS}/oauth2/dropbox/callback`,
    });

    console.log(req.user.id.toString());
    res.status(200).send(dropbox.generateAuthUrl() + `&state=${req.user.id.toString()}`);
});

router.get('/oauth2/dropbox/callback', async function(req, res) {
    try {
        const params = req.query;
        await dropbox.getToken(params.code, async function (err, result) {
            if (err) throw ("error fetching token");
            console.log('user\'s access_token: ', result.access_token);

            const userId = params.state;
            const token = result.access_token;
            const service = "dropbox";

            console.log(`userId: ${userId}`);

            await dropboxA.getAccountId(token, async (accountId, cursor) => {
                const accountInfos = accountId + " " + cursor;

                console.log(`infos: ${accountInfos}`);
                await oauth.updateToken(userId, token, accountInfos, service);
                res.status(200).send("OK");
            });
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;