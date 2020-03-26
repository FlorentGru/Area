'use strict';

const express = require('express');
const auth = require('../middleware/JWTAuth');

const generalController = require('../controllers/generalController');
const userController = require('../controllers/userController');

const fs = require('fs');

const router = express.Router();

/**
 * @typedef Area
 * @property {Action.model} action.required
 * @property {Action.model} reaction.required
 */
/**
 * new Action/REAction
 * @route POST /user/areas/new
 * @operationId newArea
 * @group User
 * @security JWT
 * @param {Area.model} area.body.required - new area
 * @produces application/json
 * @returns {string} 201 - Area created nothing to do
 * @returns {Error} 401 - Unauthorized
 * @returns {Error} default - Unexpected error
 */
router.post('/user/areas/new', auth, userController.newArea);

/**
 * @typedef UserArea
 * @property {string} _id.required
 * @property {Action.model} action.required
 * @property {Action.model} reaction.required
 */
/**
 * get a user's Actions/REActions
 * @route GET /user/areas
 * @operationId getAreas
 * @group User - General operations on users
 * @security JWT
 * @produces application/json
 * @returns {Array.<UserArea>} 200 - User areas
 * @returns {Error} 401 - Unauthorized
 * @returns {Error} 500 - Unexpected error
 */
router.get('/user/areas', auth, userController.getUserAreas);

/**
 * delete a user's Area
 * @route DELETE /user/areas/delete
 * @operationId deleteArea
 * @group User
 * @security JWT
 * @param {string} areaId.query.required
 * @produces application/json
 * @returns {Array.<UserArea>} 200 - User remaining areas
 * @returns {Error} 401 - Unauthorized
 * @returns {Error} 500 - Unexpected error
 */
router.delete('/user/areas/delete', auth, userController.deleteArea);

/**
 * get supported Actions
 * @route GET /area/actions
 * @operationId getActions
 * @group Area - Project Core: Actions and REActions
 * @produces application/json
 * @returns {Array.<Action>} 200 - success
 * @returns {Error} default - Unexpected error
 */
router.get('/area/actions', generalController.getActions);


/**
 * get supported REActions
 * @route GET /area/reactions
 * @operationId getReactions
 * @group Area - Project Core: Actions and REActions
 * @produces application/json
 * @returns {Array.<Action>} 200 - success
 * @returns {Error} default - Unexpected error
 */
router.get('/area/reactions', generalController.getReactions);

router.get('/about.json', async(req, res) => {
    console.log(req.body);
    let file = fs.readFileSync("sources/about.json");
    let about = JSON.parse(file);
    about.client.host = process.env.SERVER_ADDRESS;
    about.server.current_time = Date.now();
    res.status(200).send(about);
});

module.exports = router;