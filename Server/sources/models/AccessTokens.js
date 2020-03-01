'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Schema = mongoose.Schema;


/**
 * @typedef Token
 * @property {string} service.required
 * @property {string} accessToken.required
 * @property {string} refreshToken.required
 */
const mongoDBSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    tokens: [
        {
        service: {
            type: String,
            required: true
        },
        accessToken: {
            type: String,
            required: true
        },
        refreshToken: {
            type: String,
            required: true
        }
        }
    ]
});

mongoDBSchema.statics.fetchAccessToken = async function(userId, service) {
    const tokenModel = await AccessTokens.findOne({userId: userId, "tokens.service": service});
    if (!tokenModel) {
        console.log("No access token found for this service");
        return null;
    }
    return tokenModel.tokens.find(o => o.service === service);
}

const AccessTokens = mongoose.model('AccessTokens', mongoDBSchema);

module.exports = AccessTokens;