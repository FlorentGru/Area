'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const AccessTokens = mongoose.model('AccessTokens');
const AreActions = mongoose.model('AreActions');

const Instagram = require('node-instagram').default;

const clientId = '336005983993056';
const clientSecret = '897f3829eb2a023891f45cc808e94488';

const isTriggered = function (userId, action) {

};

exports.isTriggered = isTriggered;

const getUser = function (userId) {
    const token = AccessTokens.fetchAccessToken(userId, "instagram");
    if (!token) return;

    const instagram = new Instagram({
        clientId: clientId,
        clientSecret: clientSecret,
        accessToken: token.accessToken,
    });

// Get information about the owner of the access_token.
    const data = instagram.get('users/self');
    console.log(data);

    return (data);
};

const getUserByCred = async function(userId) {
    const token = AccessTokens.fetchAccessToken(userId, "instagram");
    if (!token) return;

    let Instagram = require('instagram-nodejs-without-api');
    Instagram = new Instagram()


    Instagram.getCsrfToken().then((csrf) =>
    {
        Instagram.csrfToken = csrf;
    }).then(() =>
    {
        return Instagram.auth(token.accessToken, token.refreshToken).then(sessionId =>
        {
            Instagram.sessionId = sessionId;

            console.log(Instagram.userIdFollowers);

            return Instagram.getUserById(Instagram.sessionId).then((t) =>
            {
                return Instagram.getUserFollowers(t.graphql.user.id).then((t) =>
                {
                    console.log(t); // - instagram followers for user
                })
            })

        })
    }).catch(console.error);
}