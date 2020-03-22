'use strict';

const eventEmitter = require('../webhooks/eventEmitter');
const listener = require('../webhooks/eventListener');

const mongoose = require('mongoose');
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

    //console.log("user areas: %s", await this.getUserAreas(userId));

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
    console.log("delete Area");

    discord.restart();

    return await this.getUserAreas(userId);
};

exports.getUserAreas = async function(userId)
{
    //console.log(await Area.find());
    const area = await Area.findOne({userId});
    if (!area) throw ('Internal Error: no area list in database');

    const areas = area.areas;
    if (!areas) throw "Internal Error";
    console.log("get Areas");
    if (areas.empty) console.log("no areas");
//    console.log(`areas: ${areas}`);

    return areas;
};
