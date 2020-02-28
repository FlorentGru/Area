'use strict';

const dropboxV2Api = require('dropbox-v2-api');

const eventEmitter = require('../webhooks/eventEmitter');
const listener = require('../webhooks/eventListener');

exports.getAction = function (accounts, users) {
    const dropbox = dropboxV2Api.authenticate({
        token: 'uwQPg4seCZAAAAAAAAAALNddpSn52Oc8rrW0mRHut79ZdP5e32URu64yvVWWIMvm'
    });
    dropbox({
        resource: 'files/list_folder/continue',
        parameters: {
            "cursor": 'AAHChbXy35BVNI6i9-7a2AeDZTwF9JgZJPBXQ_XwrnUMQda-rIFe-Es0N0h1T4znidpDvD26113Peo2DzypwzE5ObgXjzkEmu70po0mPoe7u6gB27KHXnmFN6_WIi8oqk01SxoxjAdoPPzuNgcpveXgZHTTeJ724l8AhFx5dgxVbBNbgjEqk5Y9TTE1EA8dDhveG7DdBOKVxkwx3f0WW4UMo'
        }
    }, (err, result, response) => {
        if (err) { return console.log(err); }
        console.log(result);
        console.log("==================");
        console.log(result.entries[0]['.tag']);
        console.log(result.entries[1]['.tag']);
    });

/*    var cursor = "";
    dropbox({
        resource: 'files/list_folder',
        parameters: {
            "path": "/test/",
            "recursive": false,
            "include_media_info": false,
            "include_deleted": false,
            "include_has_explicit_shared_members": false,
            "include_mounted_folders": true,
            "include_non_downloadable_files": true
        }
    }, (err, result, response) => {
        if (err) { return console.log(err); }
//        console.log(result);
        cursor = result.cursor;
        dropbox({
            resource: 'files/list_folder/continue',
            parameters: {
                "cursor": cursor
            }
        }, (err, result, response) => {
            if (err) { return console.log(err); }
            console.log(result);
        });
//        console.log(cursor);
    });*/
};