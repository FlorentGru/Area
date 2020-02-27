'use strict';

const Router = require('express').Router();
const eventEmitter = require('../webhooks/eventEmitter');
const listener = require('../webhooks/eventListener');

Router.get('/webhook', async (req, res) => {
    console.log(JSON.stringify(req.headers));
    console.log(req.query);
    res.status(200).send(req.query.challenge);
});

Router.post('/webhook', async (req, res) => {
    console.log(JSON.stringify(req.headers));
    console.log(req.body);
    res.status(200).send('success');
});

Router.post('/webhook/test', async (req, res) => {
    console.log(JSON.stringify(req.headers));
    console.log(req.body);
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

/*
Router.post('/webhook/google/sendMail', async (req, res) => {
    console.log(req.body);
    eventEmitter.emit('sendMail', req.body);
    res.status(200).send('success');
});
*/

module.exports = Router;
