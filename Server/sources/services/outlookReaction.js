const nodemailer = require('nodemailer');

exports.sendMail = async function(to, subject, content) {
    var transport = nodemailer.createTransport("SMTP", {
        service: "hotmail",
        auth: {
            user: "onmeritelegradeA@hotmail.com",
            pass: "Hasherlesmdpcestpourlesnuls"
        }
    });
    /*
        let transporter = await nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            secureConnection: false,
            port: 587,
            tls: {
                ciphers:'SSLv3'
            },
            auth: {
                user: "area.epitech.nantes.2022@outlook.fr",
                pass: "Hasherlesmdpcestpourlesnuls",
            }
        });

     */
    console.log("here");
    let info = await transporter.sendMail({
        from: '"AREA" <onmeritelegradeA@hotmail.com>',
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