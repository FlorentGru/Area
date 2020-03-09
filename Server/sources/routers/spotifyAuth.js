'use strict';

const express = require('express');
const auth = require('../middleware/JWTAuth');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const AccessTokens = mongoose.model('AccessTokens');
const fetch = require('node-fetch');
const btoa = require('btoa');


const router = express.Router();

const oauth = require('../services/tokenService');
var SpotifyWebApi = require('spotify-web-api-node');

/**
 * Authenticate for spotify
 * @route GET /oauth2/spotify
 * @operationId spotifyAuth
 * @group OAuth2 - service authentications
 * @param {string} callback.query.required
 * @security JWT
 * @returns {string} 200 - redirect Url
 * @returns {Error} 401 - Unauthorized
 */

router.get('/oauth2/spotify', auth, async (req, res) => {
    try {
        const callback = req.query.callback;
        if (!callback) throw ("missing callback");
        var scopes = ['user-modify-playback-state', 'playlist-modify-public', 'playlist-modify-private', 'app-remote-control', 'playlist-read-private'],
            redirectUri = `${process.env.SERVER_ADDRESS}/oauth2/spotify/callback`,
            clientId = process.env.SPOTIFY_CLIENT_ID,
            state = req.user.id.toString() + '%20' + callback;

        var spotifyApi = new SpotifyWebApi({
            redirectUri: redirectUri,
            clientId: clientId
        });

        var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
        console.log(authorizeURL);
        res.status(200).send({data: authorizeURL});
    } catch (err) {
        res.status(400).send({error: err});
    }
});

router.get('/oauth2/spotify/callback', async (req, res) => {
    try {
        const state = req.query.state.split(" ");
        const userId = state[0];
        const callback = state[1];
        const code = req.query.code;
        let redirect = encodeURIComponent(`${process.env.SERVER_ADDRESS}/oauth2/spotify/callback`);

        const creds = btoa(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`);
        console.log(process.env.SPOTIFY_CLIENT_SECRET);
        const response = await fetch(`https://accounts.spotify.com/api/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${creds}`,
                    'Accept':'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
        var json = await response.json();
        console.log(json);
        await oauth.updateToken(userId, json.access_token, json.refresh_token, "spotify");
        res.redirect(callback);
    } catch (err) {
        console.log("ERROR: ", err);
        res.status(400).send(err);
    }
});

module.exports = router;