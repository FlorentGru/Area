'use strict';

const Router = require('express').Router();
const eventEmitter = require('../webhooks/eventEmitter');
const listener = require('../webhooks/eventListener');
const dropboxA = require('../actions/dropboxAction');

Router.post('/webhook/github/push', async (req, res) => {
    console.log("GITHUB PUSH TRIGGERED");
    console.log(req.body);
    eventEmitter.emit('github', req.body, 'push');
    res.status(200).send('success');
});

Router.post('/webhook/github/pullRequest', async (req, res) => {
    console.log("GITHUB PULL REQUEST TRIGGERED");
    console.log(req.body);
    eventEmitter.emit('github', req.body, 'pullRequest');
    res.status(200).send('success');
});

Router.post('/webhook/dropbox', async (req, res) => {
    console.log("DROPBOX TRIGGERED");
    console.log(req.body);
    eventEmitter.emit('dropbox', req.body);
    res.status(200).send('success');
});

Router.get('/webhook/dropbox', async (req, res) => {
    console.log("DROPBOX CONFIRMED");
    console.log(req.body);
    res.status(200).send(req.query.challenge);
});

module.exports = Router;
