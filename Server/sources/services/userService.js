'use strict';

const eventEmitter = require('../webhooks/eventEmitter');
const listener = require('../webhooks/eventListener');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const AccessTokens = mongoose.model('AccessTokens');
const Area = mongoose.model('Area');

exports.login = async function(email, password)
{
    if (!email || !password) throw ('Invalid body');

    const user = await User.findByCredentials(email, password);

    const token = await user.generateAuthToken();
    return token;
};

exports.createUser = async function(email, name, password)
{
    if (!email || !name || !password) throw ('Invalid body');

    const userBody = {
        email: email,
        name: name,
        password: password
    };
    const user = new User(userBody);
    await user.save();
    const token = await user.generateAuthToken();

    const accessTokens = new AccessTokens({
        userId: user.id,
        tokens: []
    });
    await accessTokens.save();

    const areas = new Area({
        userId: user.id,
        areas: []
    });
    await areas.save();

    return token;
};

exports.isConnected = async function(userId, service)
{
    if (!service) throw("Need service in query");

    const token = await AccessTokens.fetchAccessToken(userId, service);

    return (token !== null);
};