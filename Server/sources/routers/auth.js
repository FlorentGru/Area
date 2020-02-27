'use strict';

const express = require('express');

global.ServerAddress = "";

const auth = require('../middleware/JWTAuth');

const mongoose = require('mongoose')
const User = mongoose.model('User');
const AccessTokens = mongoose.model('AccessTokens');
const AreActions = mongoose.model('AreActions');

/*User.collection.drop();
AccessTokens.collection.drop();
AreActions.collection.drop();*/

const router = express.Router();
/**
* Config new server address
* @route PUT /config/address
* @operationId updateAddress
* @group Config - Operations on server config
* @param {string} address.query.required - ngrok server address
* @produces application/json
* @returns {string} 200 - success
* @returns {string} 400 - Invalid address
* @returns {Error} default - Unexpected error
*/
router.put('/config/address', async (req, res) => {
    try {
        const address = req.query.address;
        if (!address) throw ('no address');
        if (!address.startsWith("https://") || !address.endsWith('.ngrok.io')) {
            throw ('invalid address');
        }

        process.env.SERVER_ADDRESS = address;
        res.status(200).send("success");
    } catch (err) {
        res.status(400).send(err);
    }
});

/**
 * @typedef Error
 * @property {string} code.required
 */
/**
 * Register new user
 * @route POST /auth/register
 * @operationId register
 * @group Users - General operations on users
 * @param {User.model} user.body.required - new user
 * @produces application/json
 * @returns {string} 201 - JWT token
 * @returns {Error} default - Unexpected error
 */
router.post('/auth/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();

        const accessTokens = new AccessTokens({
            userId: user.id,
            tokens: []
        });
        await accessTokens.save();

        const userTokens = await AccessTokens.findOne({ userId: user.id});
        if (!userTokens) {
            return;
        }

        const areas = new AreActions( {
            userId: user.id,
            areas: []
        });
        await areas.save();

        res.status(201).send({token})
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

/**
 * User login
 * @route POST /auth/login
 * @operationId login
 * @group Users - General operations on users
 * @param {Login.model} login.body.required - user credentials
 * @produces application/json
 * @returns {string} 200 - JWT token
 * @returns {Error} 401 - Login failed or Not authorized
 */
router.post('/auth/login', async(req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findByCredentials(email, password);

        const token = await user.generateAuthToken();
        res.status(200).send({token});
    } catch (err) {
        res.status(401).send(err);
    }
});

module.exports = router;