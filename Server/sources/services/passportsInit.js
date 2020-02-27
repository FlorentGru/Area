'use strict';

const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

module.exports = () => {
    passport.serializeUser((user, cb) => cb(null, user))
    passport.deserializeUser((obj, cb) => cb(null, obj))

    const callback = (accessToken, refreshToken, profile, cb) => cb(null, {
        accessToken: accessToken,
        refreshToken: refreshToken
    });

    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "https://localhost:8081/oauth2/github/callback"
    }, callback));
};