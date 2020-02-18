const express = require('express');

var mongoose = require('mongoose')
var User = mongoose.model('User');
var AccessTokens = mongoose.model('AccessTokens');

const router = express.Router();

router.getActionsList('area/actions', async (req, res) => {

});