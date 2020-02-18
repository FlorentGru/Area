'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Schema = mongoose.Schema;

const Action = new mongoose.Schema({
    service: {
        type: "string",
        required: true
    },
    name: {
        type: "string",
        required: true
    },
    params: [{
        param: {
            type: "string"
        }
    }]
});

const mongoDBSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    areas: [{
        action: Action,
        reaction: Action
    }]
});

const AreActions = mongoose.model('AreActions', mongoDBSchema);

module.exports = AreActions;