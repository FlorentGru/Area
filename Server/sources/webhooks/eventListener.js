'use strict';

const emitter = require('./eventEmitter');
const discord = require('./DiscordReaction');

emitter.on('pubsub', async function(userId, reaction) {
    if (reaction.service === '') {

    }
    await discord.react(reaction);
});