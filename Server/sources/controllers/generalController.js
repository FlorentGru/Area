'use strict';

exports.configAddress = async (req, res) => {
    try {
        const address = req.query.address;
        if (!address) throw ('no address');
        if (!address.startsWith("https://") || !address.endsWith('.ngrok.io')) {
            throw ('invalid address');
        }

        process.env.SERVER_ADDRESS = address;
        console.log(process.env.SERVER_ADDRESS);
        res.status(200).send({data: "success"});
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.getActions = async (req, res) => {
    const actions = [
        {
            service: "discord",
            name: "message",
            params: [
                {
                    name: "server",
                    value: "String"
                },
                {
                    name: "channel",
                    value: "String"
                },
                {
                    name: "startWith",
                    value: "String"
                },
            ]
        },
        {
            service: "github",
            name: "push",
            params: [
                {
                    name: "owner",
                    value: "String"
                },
                {
                    name: "repo",
                    value: "String"
                }
            ]
        },
        {
            service: "github",
            name: "pullRequest",
            params: [
                {
                    name: "owner",
                    value: "String"
                },
                {
                    name: "repo",
                    value: "String"
                }
            ]
        },
        {
            service: "timer",
            name: "countdown",
            params: [
                {
                    name: "hours",
                    value: "integer"
                },
                {
                    name: "minutes",
                    value: "integer"
                },
                {
                    name: "message",
                    value: "String"
                }
            ]
        },
        {
            service: "timer",
            name: "loop",
            params: [
                {
                    name: "hours",
                    value: "integer"
                },
                {
                    name: "minutes",
                    value: "integer"
                },
                {
                    name: "message",
                    value: "String"
                }
            ]
        },
        {
            service: "dropbox",
            name: "deleted",
            params: [
            ]
        },
        {
            service: "dropbox",
            name: "created",
            params: [
            ]
        },
        {
            service: "dropbox",
            name: "renamed",
            params: [
            ]
        },
        {
            service: "dropbox",
            name: "path changed",
            params: [
            ]
        },
    ];
    res.status(200).send({data: actions});
};

exports.getReactions = async (req, res) => {
    const reactions = [
        {
            service: "discord",
            name: "message",
            params: [
                {
                    name: "webhookUrl",
                    value: "String"
                }
            ]
        },
        {
            service: "github",
            name: "issue",
            params: [
                {
                    name: "owner",
                    value: "String"
                },
                {
                    name: "repo",
                    value: "String"
                }
            ]
        },
        {
            service: "gmail",
            name: "sendTo",
            params: [
                {
                    name: "dest",
                    value: "email"
                },
                {
                    name: "subject",
                    value: "String"
                }
            ]
        },
        {
            service: "slack",
            name: "message",
            params: [
                {
                    name: "hook",
                    value: "url"
                }
            ]
        },
        {
            service: "zoho",
            name: "sendTo",
            params: [
                {
                    name: "dest",
                    value: "email"
                },
                {
                    name: "subject",
                    value: "String"
                }
            ]
        },
        {
            service: "spotify",
            name: "addSong",
            params: []

        },
        {
            service: "spotify",
            name: "playSong",
            params: []
        },
        {
            service: "spotify",
            name: "pause",
            params: []
        }
    ];
    res.status(200).send({data: reactions});
};