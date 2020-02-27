'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Schema = mongoose.Schema;

/**
 * @typedef Param
 * @property {string} name.required
 * @property {string} value.required
 */
/**
 * @typedef Action
 * @property {string} service.required
 * @property {string} name.required
 * @property {Array.<Param>} params.required
 */
const Action = new mongoose.Schema({
    service: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    params: [{
        name: {
            type: String
        },
        value: {
            type: String
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