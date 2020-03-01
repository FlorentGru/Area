const nodemailer = require('nodemailer');
const gmail = require('./gmailReaction');
const zoho = require('./zohoReaction');

exports.react = async function(reaction, param) {
    if (reaction.name === "sendTo") {
        const param1 = reaction.params.find( ({name}) => name === "dest");
        const param2 = reaction.params.find( ({name}) => name === "subject");
        if (!param1 || !param2) {
            console.log("Error missing param");
            return;
        }

        if (!param || param.isEmpty) {
            param = "No content specified";
        }

        if (reaction.service === "gmail") {
            await gmail.sendMail(param1.value, param2.value, param);
        } else {
            await zoho.sendMail(param1.value, param2.value, param);
        }
    }
};