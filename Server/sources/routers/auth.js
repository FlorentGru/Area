'use strict';

const express = require('express');

const auth = require('../middleware/JWTAuth');

const userController = require('../controllers/userController');
const generalController = require('../controllers/generalController');

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
router.get('/user/is_connected', auth, userController.isConnected);

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
router.put('/config/address', generalController.configAddress);

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
router.post('/user/register', userController.register);

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
router.post('/user/login', userController.login);

module.exports = router;