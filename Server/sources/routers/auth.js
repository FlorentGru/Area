const express = require('express');
const auth = require('../JWTAuth');

var mongoose = require('mongoose'),
    User = mongoose.model('User');

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
        const user = new User(req.body);
        await user.save();
        const token = await user.generateJWT();
        res.status(201).send({ token })
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
        const { email, password } = req.body;
        const user = await User.fetchUser(email, password);
        if (!user) {
            return res.status(401).send({error: 'Error : Login failed.'})
        }
        const token = await user.generateJWT();
        res.send({ token })
});

module.exports = router;