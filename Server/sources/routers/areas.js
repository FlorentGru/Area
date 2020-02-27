'use strict';

const express = require('express');
const auth = require('../middleware/JWTAuth');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const AccessTokens = mongoose.model('AccessTokens');
const AreActions = mongoose.model('AreActions');

const eventEmitter = require('../webhooks/eventEmitter');
const listener = require('../webhooks/eventListener');

const discord = require('../webhooks/discordAction');
const { body, oneOf, validationResult } = require('express-validator');


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
* @security JWT
* @param {Area.model} area.body.required - new area
* @produces application/json
* @returns {string} 201 - Area created nothing to do
* @returns {string} 200 - discord bot OAuth link (for discord action)
* @returns {string} 300 - discord webhook OAuth link (for discord reaction)
* @returns {Error} 401 - Unauthorized
* @returns {Error} default - Unexpected error
*/
router.post('/area/new', auth, oneOf([
    body('action').exists(),
    body('reaction').exists(),
    body('action.service').exists().isIn(['discord', 'oneDrive', 'messenger', 'github']),
    body('action.name').exists().isAlpha(),
    body('action.nbrParam').exists().isNumeric(),
    body('reaction.service').exists().isIn(['discord', 'oneDrive', 'messenger', 'github']),
    body('reaction.name').exists().isAlpha(),
    body('reaction.nbrParam').exists().isNumeric(),
]), async(req, res) => {
    try {
        validationResult(req).throw();

        const action = req.body.action;
        const reaction = req.body.reaction;

        const query = { userId: req.user.id };
        const update = { $push: {
            areas: {
                action: action,
                reaction: reaction
            }
        }};
        await AreActions.findOneAndUpdate(query, update);

        eventEmitter.emit('webhook', req.user.id, action);
        res.status(201).send("Created :)");
    } catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
});


module.exports = router;