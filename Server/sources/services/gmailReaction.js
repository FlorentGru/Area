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

const sendMail = async function(to, subject, content) {
    let transporter = await nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "area.epitech.nantes.2022@gmail.com",
            pass: "Hasherlesmdpcestpourlesnuls",
        }
    });
    let info = await transporter.sendMail({
        from: '"AREA" <area.epitech.nantes.2022@gmail.com>',
        to: to,
        subject: subject,
        text: content,
        html: `<p>${content}</p>`
    }, function(err, data) {
        if (err) {
            console.log("Error Occurs");
        } else {
            console.log("Email Sent !");
        }
    });
};