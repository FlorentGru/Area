const nodemailer = require('nodemailer');

exports.react = async function(reaction) {
    if (reaction.name === "sendTo") {
        const param1 = reaction.params.find( ({name}) => name === "dest");
        const param2 = reaction.params.find( ({name}) => name === "subject");
        const param3 = reaction.params.find( ({name}) => name === "content");
        if (!param1 || !param2 || !param3) {
            console.log("Error missing param");
            return;
        }
        await sendMail(param1.value, param2.value, param3.value);
    }
};