'use strict';

const express = require('express');

const auth = require('../middleware/JWTAuth');

const mongoose = require('mongoose')
const User = mongoose.model('User');
const AccessTokens = mongoose.model('AccessTokens');
const Area = mongoose.model('Area');

/*User.collection.drop();
AccessTokens.collection.drop();
AreActions.collection.drop();*/

const router = express.Router();

/**
 * Is the user connected to this service
 * @route GET /user/is_connected
 * @operationId isConnected
 * @group User - General operations on users
 * @security JWT
 * @param {string} service.query.required
 * @returns {boolean} 200 - yes or no
 * @returns {string} 401 - Unauthorized
 */
router.get('/user/is_connected', auth, async (req, res) => {
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
        res.status(400).send({error: err});
    }
});

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
        console.log(process.env.SERVER_ADDRESS);
        res.status(200).send({data: "success"});
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
 * @route POST /user/register
 * @operationId register
 * @group User - General operations on users
 * @param {User.model} user.body.required - new user
 * @produces application/json
 * @returns {string} 201 - JWT token
 * @returns {Error} default - Unexpected error
 */
router.post('/user/register', async (req, res) => {
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

        const areas = new Area( {
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
 * User log in
 * @route POST /user/login
 * @operationId login
 * @group User - General operations on users
 * @param {Login.model} login.body.required - user credentials
 * @produces application/json
 * @returns {string} 200 - JWT token
 * @returns {Error} 401 - Login failed or Not authorized
 */
router.post('/user/login', async(req, res) => {
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