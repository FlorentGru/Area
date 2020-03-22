const nodemailer = require('nodemailer');

exports.sendMail = async function(to, subject, content) {
    let transporter = await nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true,
        auth: {
            user: "area.epitek.nantes.2022@zohomail.com",
            pass: "Hasherlesmdpcestpourlesnuls#1",
        }
    });
    let info = await transporter.sendMail({
        from: '"AREA" <area.epitek.nantes.2022@zohomail.com>',
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
//    console.log(info);
};

