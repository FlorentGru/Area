'use strict';

const express = require('express');
const auth = require('../middleware/JWTAuth');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const AccessTokens = mongoose.model('AccessTokens');

const router = express.Router();

const oauth = require('../services/tokenService');

let githubOAuth2 = require('node-github-oauth2');

/**
 * Authenticate for github
 * @route GET /oauth2/github
 * @operationId githubAuth
 * @group OAuth2 - service authentications
 * @param {string} callback.query.required
 * @security JWT
 * @returns {string} 200 - redirect Url
 * @returns {Error} 401 - Unauthorized
 */
router.get('/oauth2/github', auth, async (req, res) => {
    try {
        const callback = req.query.callback;
        if (!callback) throw ("missing callback");

        githubOAuth2 = require('node-github-oauth2');
        githubOAuth2.initialize({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            redirectURI: `${process.env.SERVER_ADDRESS}/oauth2/github/callback`,
            scope: 'public_repo',
            gitDirectory: 'Users',
            userAgent: "Area - Epitech Project"
        });

        const state = req.user.id.toString() + ' ' + callback;

        console.log(`${process.env.SERVER_ADDRESS}/oauth2/github/callback`);
        const data = githubOAuth2.getRedirectURL(state);
        console.log(data);
        res.status(200).send({data: data});
    } catch (err) {
        res.status(400).send({error: err});
    }
});

router.get('/oauth2/github/callback', githubOAuth2.getToken, async (req, res) => {
    try {
        const state = req.state.split(" ");
        const userId = state[0];
        const callback = state[1];
        const token = req.token;
        const service = "github";

        console.log(`userId: ${userId}`);
        console.log(`callback: ${callback}`);
        console.log(`token: ${token}`);
        console.log(`service: ${service}`);
        await oauth.updateToken(userId, token, "", service);

        res.redirect(callback);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;