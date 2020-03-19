'use strict';

var SpotifyWebApi = require('spotify-web-api-node');

const mongoose = require('mongoose');
const AccessTokens = mongoose.model('AccessTokens');
const fetch = require('node-fetch');

exports.react = async function(userId, reaction, param) {
    if (reaction.name === "addSong") {
        const tokens = await AccessTokens.fetchAccessToken(userId, "spotify");
        if (!tokens) {
            return;
        }
        const token = tokens.accessToken;

        await addSong(token, param);
    }
    
    if (reaction.name === "playSong") {
        const tokens = await AccessTokens.fetchAccessToken(userId, "spotify");
        if (!tokens) {
            return;
        }
        const token = tokens.accessToken;

        await playSong(token, param);
    }

    if (reaction.name === "pause") {
        const tokens = await AccessTokens.fetchAccessToken(userId, "spotify");
        if (!tokens) {
            return;
        }
        const token = tokens.accessToken;

        await pause(token);
    }
};

const playSong = async function (token, title) {
    try {
        var spotifyApi = new SpotifyWebApi({ accessToken: token });
        spotifyApi.searchTracks(title).then(
            function (data) {
                if (data.body.tracks.items.length === 0)
                    return;
                console.log(data.body.tracks.items[0].uri);

                spotifyApi.play({ uris: [data.body.tracks.items[0].uri] }).then(function (data) {
                    },
                    function (error) {
                        console.log(error)
                    })
            },
            function (error) {
                console.log(error)
            }
        )
    } catch (err) {
        console.error(err.message)
    }
};

const pause = async function (token) {
    try {
        var spotifyApi = new SpotifyWebApi({accessToken: token});
        spotifyApi.pause().then(function (data) {
        }, function (error) {
            console.log(error)
        })
    } catch (err) {
        console.error(err.message)
    }
}; 

const addSong = async function (token, title) {
    try {
        var spotifyApi = new SpotifyWebApi({ accessToken: token });

        spotifyApi.searchTracks(title).then(
            function (data) {
                if (data.body.tracks.items.length === 0)
                    return;
                var addInQueueResponse = fetch(`https://api.spotify.com/v1/me/player/add-to-queue?uri=${songUri}`,
                    {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Accept':'application/json',
                            'Content-Type': 'application/json',
                        },
                    });
            },
            function (error) {
                console.log(error)
            }
        )
    } catch (err) {
        console.error(err.message)
    }
};