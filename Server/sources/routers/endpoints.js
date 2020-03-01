'use strict';

const Router = require('express').Router();
const eventEmitter = require('../webhooks/eventEmitter');
const listener = require('../webhooks/eventListener');
const dropboxA = require('../webhooks/dropboxAction');

Router.post('/webhook/github/push', async (req, res) => {
    console.log("GITHUB PUSH TRIGGERED")
    console.log(req.body);
    eventEmitter.emit('push', req.body);
    res.status(200).send('success');
});

Router.post('/webhook/github/pullRequest', async (req, res) => {
    console.log("GITHUB PULL REQUEST TRIGGERED")
    console.log(req.body);
    eventEmitter.emit('pullRequest', req.body);
    res.status(200).send('success');
});

Router.post('/webhook/dropbox', async (req, res) => {
    console.log("DROPBOX TRIGGERED")
    console.log(req.body);
    eventEmitter.emit('dropbox', req.body);
    res.status(200).send('success');
});

Router.get('/webhook/dropbox', async (req, res) => {
    console.log(req.body);
    res.status(200).send(req.query.challenge);
});

Router.post('/webhook/twitter', async (req, res) => {
    console.log("TWITTER TRIGGERED")
    console.log(req.body);
    res.status(200).send('success');
});

module.exports = Router;
