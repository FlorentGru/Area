'use strict';

const express = require('express');
const auth = require('../middleware/JWTAuth');

var mongoose = require('mongoose')
var User = mongoose.model('User');
var AccessTokens = mongoose.model('AccessTokens');

const router = express.Router();

router.put('services/oauth', auth, async (req, res) => {
   try {
        const {service, accessToken, refreshToken} = req.body;

        const query = { userId: req.user.id };
        const update = { $set: { 'tokens.$[elem].accessToken': accessToken, 'tokens.$[elem].refreshToken': refreshToken } };
        const options = { new: true, upsert: true, arrayFilters: [{ 'elem.service': service }]};
        await AccessTokens.findOneAndUpdate(query, update, options);

        res.status(200).send("OK");
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