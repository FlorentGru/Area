'use strict';

const express = require('express');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const AccessTokens = mongoose.model('AccessTokens');

exports.updateToken = async function (userId, accessToken, refreshToken, service) {
    const userTokens = await AccessTokens.findOne({ userId: mongoose.Types.ObjectId(userId)});
    if (!userTokens) {
        console.log("wrong user ?")
        return;
    }

    console.log("user tokens: ", userTokens);
    const serviceToken = userTokens.tokens.find(token => token.service === service);
    console.log("service token: ", serviceToken);
    if (!serviceToken) {
        console.log("push");
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
        const update = {$set: {'tokens.$[elem].accessToken': accessToken, 'tokens.$[elem].refreshToken': refreshToken}};
        const options = {arrayFilters: [{'elem.service': service}]};

        await userTokens.updateOne(update, options);
    }
};