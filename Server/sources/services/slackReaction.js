const request = require('request-promise');

exports.react = async function (userId, reaction, param) {
    try {
        const param1 = reaction.params.find(({ name }) => name === 'hook');
        if (!param1) return;
        if (!param || param.isEmpty) {
            param = "No content specified."
        }

        const hook = param1.value;

        const slackBody = {
            text: param
        };

        const res = await request({
            url: hook,
            method: 'POST',
            body: slackBody,
            json: true
        });
    } catch (e) {
        console.log('Error', e);
    }
};