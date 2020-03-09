'use strict';

const eventEmitter = require('../webhooks/eventEmitter');
const listener = require('../webhooks/eventListener');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const AccessTokens = mongoose.model('AccessTokens');
const Area = mongoose.model('Area');

const crypto = require('crypto'),
    algorithm = 'aes-256-ecb',
    key = new Buffer(process.env.ENCRYPTION_KEY, 'hex');

function encrypt(text){
    let iv = new Buffer('');
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let crypted = cipher.update(text,'utf8','hex');
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text){
    let iv = new Buffer('');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let dec = decipher.update(text,'hex','utf8');
    dec += decipher.final('utf8');
    return dec;
}


exports.login = async function(email, password)
{
    if (!email || !password) throw ('Invalid body');

    const crypt = encrypt(password);
    console.log(password);
    console.log(decrypt(crypt));

    const user = await User.findByCredentials(email, password);

    const token = await user.generateAuthToken();
    return token;
};

exports.createUser = async function(email, name, password)
{
    if (!email || !name || !password) throw ('Invalid body');

    const crypt = encrypt(password);
    console.log(password);
    console.log(decrypt(crypt));

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