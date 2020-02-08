const express = require('express')
const auth = require('../JWTAuth')

const router = express.Router()

/**
 * @typedef Error
 * @property {string} code.required
 */
/**
 * Register new user
 * @route GET /auth/register
 * @operationId register
 * @group Users - General operations on users
 * @produces application/json
 * @returns {string} 201 - JWT token
 * @returns {Error} default - Unexpected error
 */
router.post('/auth/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ token })
    } catch (error) {
        res.status(400).send(error)
    }
});

/**
 * User login
 * @route GET /auth/login
 * @operationId login
 * @group Users - General operations on users
 * @produces application/json
 * @returns {string} 200 - An array of users
 * @returns {Error} 401 - Login failed or Not authorized
 */
router.post('/auth/login', async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        if (!user) {
            return res.status(401).send({error: 'Error : Login failed.'})
        }
        const token = await user.generateAuthToken();
        res.send({ token })
    } catch (error) {
        res.status(401).send({ error: 'Error : Not authorized.' })
    }
});

module.exports = router;