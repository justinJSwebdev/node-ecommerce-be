const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const sendMail = asyncHandler(async (email, htmlContent) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const info = await transporter.sendMail({
        from: 'Hung Dep Trai kiu to', // sender address
        to: email, // list of receivers
        subject: "Hung Shop send confirmation email", // Subject line
        text: "Hi please check these info carefully", // plain text body
        html: htmlContent, // html body
    });
    return info;
});
module.exports = sendMail;