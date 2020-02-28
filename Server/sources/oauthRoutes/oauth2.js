'use strict';

const express = require('express');
const auth = require('../middleware/JWTAuth');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const AccessTokens = mongoose.model('AccessTokens');

const router = express.Router();

/**
 * Is the user connected to this service
 * @route GET /oauth2/connected
 * @operationId isConnected
 * @group OAuth2 - service authentications
 * @security JWT
 * @param {string} service.query.required
 * @returns {boolean} 200 - yes or no
 * @returns {Error} 401 - Unauthorized
 */
router.get('/oauth2/connected', auth, async (req, res) => {
    try {
        const service = req.query.service;
        if (!service) throw("Need service in query");

        const token = await AccessTokens.fetchAccessToken(req.user.id, service);
        console.log(token.accessToken);
        if (!token) {
            res.status(200).send(false);
        } else {
            res.status(200).send(true);
        }
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;