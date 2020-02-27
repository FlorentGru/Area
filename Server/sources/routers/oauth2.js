'use strict';

const express = require('express');
const auth = require('../middleware/JWTAuth');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const AccessTokens = mongoose.model('AccessTokens');

const passport = require('passport');

const redirectDiscord = encodeURIComponent('https://localhost:8081/oauth2/discord/callback');
const scopeDiscord = "identify";

const githubAuth = passport.authenticate('github', {
    scopes: ["public_repo"]
});


const router = express.Router();

const githubOAuth2 = require('node-github-oauth2');
githubOAuth2.initialize({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    redirectURI: 'https://localhost:8081/oauth2/github/callback',
    scope: 'public_repo',
    gitDirectory: 'Users',
    userAgent: "Area - Epitech Project"
});

/**
 * Authenticate for github
 * @route GET /oauth2/github
 * @operationId githubAuth
 * @group OAuth2 - service authentications
 * @security JWT
 * @returns {string} 200 - redirect Url
 * @returns {Error} 401 - Unauthorized
 */
router.get('/oauth2/github', auth, async (req, res) => {
    console.log(req.user.id.toString());
    res.status(200).send(githubOAuth2.getRedirectURL(req.user.id.toString()));
});

router.get('/oauth2/github/callback', githubOAuth2.getToken, async (req, res) => {
    try {
        const userId = req.state;
        const token = req.token;
        const service = "github";

        console.log(`token: ${token}`);
        updateToken(userId, token, service);

        res.status(200).send("success");
    } catch (err) {
        res.status(400).send(err);
    }
});


/**
 * Is the user connected to this service
 * @route GET /oauth2/connected
 * @operationId isConnected
 * @group OAuth2 - service authentications
 * @security JWT
 * @param {string} service.query.required
 * @returns {string} 200 - redirect Url
 * @returns {Error} 401 - Unauthorized
 */
router.get('/oauth/connected', auth, async (req, res) => {
    try {
        const service = req.query.service;
        if (!service) throw("Need service in query");

        const token = AccessTokens.fetchAccessToken(req.user.id, service);
        if (!token) {
            res.status(200).send(false);
        } else {
            res.status(200).send(true);
        }
    } catch (err) {
        res.status(400).send(err);
    }
});

const updateToken = async function (userId, token, service) {
    const userTokens = await AccessTokens.findOne({ userId: mongoose.Types.ObjectId(userId)});
    if (!userTokens) {
        return;
    }

    console.log(userTokens.tokens);
    const serviceToken = userTokens.tokens.find(({ service }) => service === service);
    if (!serviceToken) {
        const update = {
            $push: {
                tokens: {
                    service: service,
                    accessToken: token,
                    refreshToken: ""
                }
            }
        };

        await userTokens.updateOne(update);
    } else {
        console.log("ici");
        const update = {$set: {'tokens.$[elem].accessToken': token, 'tokens.$[elem].refreshToken': ""}};
        const options = {arrayFilters: [{'elem.service': service}]};

        await userTokens.updateOne(update, options);
    }
};

module.exports = router;