'use strict';

const express = require('express');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const AccessTokens = mongoose.model('AccessTokens');

exports.updateToken = async function (userId, token, service) {
    const userTokens = await AccessTokens.findOne({ userId: mongoose.Types.ObjectId(userId)});
    if (!userTokens) {
        return;
    }

    console.log(userTokens.tokens);
    const serviceToken = userTokens.tokens.find(({ service }) => service === service);
    if (!serviceToken) {
        const update = {
            $push: {
                tokens: {
                    service: service,
                    accessToken: token,
                    refreshToken: ""
                }
            }
        };

        await userTokens.updateOne(update);
    } else {
        console.log("ici");
        const update = {$set: {'tokens.$[elem].accessToken': token, 'tokens.$[elem].refreshToken': ""}};
        const options = {arrayFilters: [{'elem.service': service}]};

        await userTokens.updateOne(update, options);
    }
};