const mongoose = require('mongoose');
const User = mongoose.model('User');
const AccessTokens = mongoose.model('AccessTokens');
const axios = require('axios');

exports.sendMessage = function(userToken, webhookId, webhookToken, content) {
    var userId = User.GetIdByToken(userToken);
    if (!userId) {
        return ("Invalid");
    }
    var serviceTokens = AccessTokens.fetchAccessToken(userId, "discord");
    if (!serviceTokens) {
        return ("Invalid");
    }

    axios.post(`https://discordapp.com/api/webhooks/${webhookId}/${webhookToken}`, {
        content: content
    }, {
        headers: {
            Authorization: `Bearer ${serviceTokens.accessToken}`
        }
    })
        .then((res) => {
            console.log(`statusCode: ${res.status}`)
            //console.log(res)
        })
        .catch((error) => {
            console.error(error)
        })
};