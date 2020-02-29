const nodemailer = require('nodemailer');

exports.sendMail = async function(to, subject, content) {
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