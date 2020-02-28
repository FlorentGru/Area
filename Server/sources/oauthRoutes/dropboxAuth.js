'use strict';

const express = require('express');
const auth = require('../middleware/JWTAuth');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const AccessTokens = mongoose.model('AccessTokens');

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
        redirect_uri: `${process.env.SERVER_ADDRESS}/oauth2/dropbox/callback`
    });

    res.status(200).send(dropbox.generateAuthUrl(req.user.id.toString()));
});

router.get('/oauth2/dropbox/callback', async function(req, res) {
    try {
        const params = req.query;
        await dropbox.getToken(params.code, async function (err, result) {
            if (err) throw ("error fetching token");
            console.log('user\'s access_token: ', result.access_token);

            const userId = result.state;
            const token = result.access_token;
            const service = "github";

            console.log(`token: ${token}`);
            await oauth.updateToken(userId, token, service);
        });

        res.status(200).send("OK")
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;