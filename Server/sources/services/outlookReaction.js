const nodemailer = require('nodemailer');

exports.sendMail = async function(to, subject, content) {
    let transporter = await nodemailer.createTransport({
        service: "outlook",
        secure: true,
        auth: {
            user: "area.epitech.nantes.2022@outlook.fr",
            pass: "Hasherlesmdpcestpourlesnuls",
        }
    });
    console.log("here");
    let info = await transporter.sendMail({
        from: '"AREA" <area.epitech.nantes.2022@outlook.fr>',
        to: to,
        subject: subject,
        text: content,
        html: `<p>${content}</p>`
    }, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log("Email Sent !");
        }
    });
    console.log(info);
};