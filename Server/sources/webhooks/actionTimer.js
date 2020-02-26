'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const AccessTokens = mongoose.model('AccessTokens');
const AreActions = mongoose.model('AreActions');

const eventEmitter = require('../webhooks/eventEmitter');
const listener = require('../webhooks/eventListener');

const instagram = require('./instagramAction');

setInterval(function () {
    AreActions.aggregate([
        {
            "$project": {
                "userId": 1,
                "areas": 1
            }
        },
        { "$unwind": "$areas" },
        { "$match": {
            "areas.action.service": "instagram"
        }}
    ], function (err, res) {
        if (err)
            throw err;
        res.forEach(function(area) {
            if (area.areas.action.name === "follow") {

            }
        });
    });
}, 10000);