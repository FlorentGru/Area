'use strict';

const Router = require('express').Router();
const eventEmitter = require('../webhooks/eventEmitter');
const listener = require('../webhooks/eventListener');

Router.post('/webhook', async (req, res) => {
    console.log(JSON.stringify(req.headers));
    console.log(req.body);
    eventEmitter.emit('pubsub', req.body);
    res.status(200).send('success');
});

Router.post('/webhook/github/push', async (req, res) => {
    console.log(req.body);
    eventEmitter.emit('push', req.body);
    res.status(200).send('success');
});

Router.post('/webhook/github/pullRequest', async (req, res) => {
    console.log(req.body);
    eventEmitter.emit('pullRequest', req.body);
    res.status(200).send('success');
});

module.exports = Router;
