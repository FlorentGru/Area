'use strict';

const express = require('express');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const AccessTokens = mongoose.model('AccessTokens');

exports.updateToken = async function (userId, accessToken, refreshToken, service) {
    const userTokens = await AccessTokens.findOne({ userId: userId});
    if (!userTokens) return console.log("wrong user ?");

    const serviceToken = userTokens.tokens.find(token => token.service === service);
    if (!serviceToken) {
        console.log("pushed new token");
        const update = {
            $push: {
                tokens: {
                    service: service,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                }
            }
        };

        await userTokens.updateOne(update);
    } else {
        console.log("updated token");
        const update = {$set: {'tokens.$[elem].accessToken': accessToken, 'tokens.$[elem].refreshToken': refreshToken}};
        const options = {arrayFilters: [{'elem.service': service}]};

        await userTokens.updateOne(update, options);
    }
};