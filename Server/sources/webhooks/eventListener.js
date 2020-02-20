const emitter = require('./eventEmitter');
var discord = require('./DiscordReaction');

emitter.on('pubsub', function(requestBody) {
    if (requestBody.service === "Discord") {
        console.log("tried to send");
        discord.sendMessage(1, '676864537827344447', '1zBlGVRZ77m_FBY-h_jmoiDheq7DonCYNsZDTUpSYf7AtYuQj2BfC4Ln4_JL2-1qFNdU', "COUCOU LES AMIS C'EST AREA QUI VOUS PARLE")
    }
});