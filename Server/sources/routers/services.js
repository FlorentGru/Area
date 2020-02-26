'use strict';

const express = require('express');
const auth = require('../middleware/JWTAuth');

var mongoose = require('mongoose')
var User = mongoose.model('User');
var AccessTokens = mongoose.model('AccessTokens');

const router = express.Router();

/**
 * add OAuth2 connection for a service
 * @route POST services/oauth/add
 * @operationId addOAuth
 * @group Services - Operations on services supported by the application
 * @security JWT
 * @param {Token.model} token.body.required - new token
 * @produces application/json
 * @returns {string} 200 - success
 * @returns {Error} 401 - Unauthorized
 * @returns {Error} default - Unexpected error
 */
router.put('services/oauth/add', auth, async (req, res) => {
   try {
        const {service, accessToken, refreshToken} = req.body;

        const query = { userId: req.user.id };
        const update = { $set: { 'area.$[elem].accessToken': accessToken, 'tokens.$[elem].refreshToken': refreshToken } };
        const options = { new: true, upsert: true, arrayFilters: [{ 'elem.service': service }]};
        await AccessTokens.findOneAndUpdate(query, update, options);

        res.status(200).send("success");
   } catch (err) {
        res.status(400).send(err);
   }
});

router.get('services/oauth/connected', auth, async (req, res) => {
    try {
        const service = req.query.service;
        if (!service)
            throw ("Need service in query")

        const token = AccessTokens.fetchAccessToken(req.user.id, service);
        if (!token) {
            res.status(200).send(false);
        }
        else {
            res.status(200).send(true);
        }
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;