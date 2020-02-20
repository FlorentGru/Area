'use strict';

const express = require('express');
const auth = require('../middleware/JWTAuth');

var mongoose = require('mongoose');
var User = mongoose.model('User');
var AccessTokens = mongoose.model('AccessTokens');

const router = express.Router();

router.get('/area/actions', async (req, res) => {

});

router.get('/area/reactions', async (req, res) => {

});

/**
 * @typedef Area
 * @property {Action.model} action.required
 * @property {Action.model} reaction.required
 */
/**
* new Action/REAction
* @route POST /area/new
* @operationId newArea
* @group Area - Project Core: Actions and REActions
* @param {Area.model} user.body.required - new area
* @produces application/json
* @returns {string} 201 - Area created nothing to do
* @returns {string} 200 - discord bot OAuth link (for discord action)
* @returns {string} 300 - discord webhook OAuth link (for discord reaction)
* @returns {Error} 401 - Unauthorized
* @returns {Error} default - Unexpected error
*/
router.post('/area/new', auth, async(req, res) => {
    try {
        res.status(200).send("Authorized");
    } catch(err) {
        res.status(400).send(err);
    }
});

module.exports = router;