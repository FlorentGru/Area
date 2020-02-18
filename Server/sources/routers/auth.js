const express = require('express');
const auth = require('../middleware/JWTAuth');

var mongoose = require('mongoose')
var User = mongoose.model('User');
var AccessTokens = mongoose.model('AccessTokens');

const router = express.Router();

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
        res.status(201).send({token})
    } catch (err) {
        console.log(err.errmsg);
        res.status(400).send(err.errmsg);
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
        if (!user) {
            return res.status(401).send({error: 'Error : Login failed.'})
        }
        const token = await user.generateAuthToken();
//        const accessTokens = await AccessTokens.fetchAccessToken(user.id,  "discord");
 //       console.log(accessTokens);
        res.status(200).send({token});
    } catch (err) {
        console.log("ici");
        res.status(400).send(err);
    }
});

module.exports = router;