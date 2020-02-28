'use strict';

const express = require('express');
const auth = require('../middleware/JWTAuth');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const AccessTokens = mongoose.model('AccessTokens');

const router = express.Router();

const oauth = require('./oauth2');

const githubOAuth2 = require('node-github-oauth2');

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

    githubOAuth2.initialize({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        redirectURI: `${process.env.SERVER_ADDRESS}/oauth2/github/callback`,
        scope: 'public_repo',
        gitDirectory: 'Users',
        userAgent: "Area - Epitech Project"
    });

    res.status(200).send(githubOAuth2.getRedirectURL(req.user.id.toString()));
});

router.get('/oauth2/github/callback', githubOAuth2.getToken, async (req, res) => {
    try {
        const userId = req.state;
        const token = req.token;
        const service = "github";

        console.log(`token: ${token}`);
        await oauth.updateToken(userId, token, service);

        res.status(200).send("success");
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;