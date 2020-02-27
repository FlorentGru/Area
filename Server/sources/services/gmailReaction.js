import nodemailer from "nodemailer";

export default async function sendMail(to, subject, content)
{
    let transporter = nodemailer.createTransport({
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
        html: `<p>${content}</p>`,
    });
    console.log(info);
}