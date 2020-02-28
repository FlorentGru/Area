'use strict';

const express = require('express');
const auth = require('../middleware/JWTAuth');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const AccessTokens = mongoose.model('AccessTokens');

const router = express.Router();

const oauth = require('./oauth2');

const Twitter = require('twitter-lite');

let client = new Twitter({
    consumerKey: process.env.TWITTER_CLIENT_ID,
    consumerSecret: process.env.TWITTER_CLIENT_SECRET,
});

let userId = "";

/**
* Authenticate for twitter
* @route GET /oauth2/twitter
* @operationId twitterAuth
* @group OAuth2 - service authentications
* @security JWT
* @returns {string} 200 - redirect Url
* @returns {Error} 401 - Unauthorized
*/
router.get('/oauth2/twitter', auth, async (req, res, next) => {
    userId = req.user.id.toString();
    let oauth_token = '';
    let oauth_token_secret = '';

    await client.getRequestToken(`${process.env.SERVER_ADDRESS}/oauth2/twitter/callback`)
        .then(res => {
            oauth_token = res.oauth_token;
            oauth_token_secret = res.oauth_token_secret;
            console.log({
                reqTkn: res.oauth_token,
                reqTknSecret: res.oauth_token_secret
            })
        })
    res.status(200).send(`https://api.twitter.com/oauth/authenticate?oauth_token=${oauth_token}`);
});

router.get('/oauth2/twitter/callback', async (req, res) => {
    try {
        console.log(req);
//        await oauth.updateToken(userId, token, service);

        res.status(200).send("success");
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;