'use strict';

const eventEmitter = require('../webhooks/eventEmitter');
const listener = require('../webhooks/eventListener');

const mongoose = require('mongoose');
const AccessTokens = mongoose.model('AccessTokens');
const Area = mongoose.model('Area');

const discord = require('../actions/discordAction');

exports.addArea = async function(userId, action, reaction)
{
    if (!action || !reaction) throw ("Invalid Body");

    const query = {userId: userId};
    const update = {
        $push: {
            areas: {
                action: action,
                reaction: reaction
            }
        }
    };
    await Area.findOneAndUpdate(query, update);

    eventEmitter.emit('webhook', userId, action, reaction);
};

exports.deleteArea = async function(userId, areaId)
{
    if (!areaId) return ('Invalid query');

    const update = {
        $pull: {
            areas: {
                _id: areaId
            }
        }
    };
    await Area.findOneAndUpdate({userId}, update);

    discord.restart();

    return await this.getUserAreas(userId);
};

exports.getUserAreas = async function(userId)
{
    console.log(await Area.find());
    const area = await Area.findOne({userId});
    if (!area) throw ('Internal Error');

    const areas = area.areas;
    if (!areas) throw "Internal Error";
    console.log(areas);

    return areas;
};
