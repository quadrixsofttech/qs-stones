const nodemailer = require('nodemailer');
require('dotenv').config()

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    secure: false,
    port: 587,
    tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
    },
    auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
    },
    debug: true,
    logger:true,
    });

    const sendEmail = async (recepients, subject, text) => {
        try {
            await transporter.sendMail({
                from: 'no-reply@examia.io',
                to: recepients,
                subject: subject,
                text: text
            });
            return { success: true, message: 'Email sent successfully'};
        } catch (error) {
            console.error('Error sending email:', error);
            return { success: false, message: error.message };
        }
    };

module.exports = {sendEmail};