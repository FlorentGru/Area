'use strict';

const eventEmitter = require('../webhooks/eventEmitter');
const listener = require('../webhooks/eventListener');

const userService = require('../services/userService');
const areaService = require('../services/areaService');

exports.newArea = async(req, res) => {
    try {
        const action = req.body.action;
        const reaction = req.body.reaction;

        await areaService.addArea(req.user.id, action, reaction);

        res.status(201).send({data: "area created"});
    } catch(err) {
        console.log(err);
        if (!err.errmsg) res.status(400).send({error: err});
        else res.status(400).send({error: err.errmsg});
    }
};

exports.deleteArea = async function (req, res) {
    try {
        const areaId = req.query.areaId;
        const userId = req.user.id;

        const areas = await areaService.deleteArea(userId, areaId);

        res.status(200).send({data: areas});
    } catch (err) {
        if (!err.errmsg) res.status(400).send({error: err});
        else res.status(400).send({error: err.errmsg});
    }
};

exports.getAreas = async function (req, res) {
    try {
        const userId = req.user.id;
        const areas = await areaService.getAreas(userId);

        res.status(200).send({data: areas});
    } catch (err) {
        console.log(err);
        if (!err.errmsg) res.status(400).send({error: err});
        else res.status(400).send({error: err.errmsg});
    }
};

exports.login = async(req, res) => {
    try {
        const {email, password} = req.body;

        const token = await userService.login(email, password);

        res.status(200).send({data: token});
    } catch (err) {
        console.log(err);
        if (!err.errmsg) res.status(400).send({error: err});
        else res.status(400).send({error: err.errmsg});
    }
};

exports.register = async (req, res) => {
    try {
        const { email, name, password } = req.body;

        const token = await userService.createUser(email, name, password);

        res.status(201).send({data: token})
    } catch (err) {
        console.log(err);
        if (!err.errmsg) res.status(400).send({error: err});
        else res.status(400).send({error: err.errmsg});
    }
};

exports.isConnected =  async (req, res) => {
    try {
        const service = req.query.service;

        const bool = await userService.isConnected(req.user.id, service);

        res.status(200).send({data: bool});
    } catch (err) {
        if (!err.errmsg) res.status(400).send({error: err});
        else res.status(400).send({error: err.errmsg});
    }
};