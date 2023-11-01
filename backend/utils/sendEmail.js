const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, payload) => {
    try {
        const transporter = nodemailer.createTransport(
            {
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD,
                },
            }
        );
        const mailOptions = {
            to: email,
            subject,
            html: `
            <h2>Please click on given link to reset your password</h2>
            <p>${payload.name}</p>
            <a href="${payload.link}">${payload.link}</a>
            `,



        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.json({ error: 'Failed to send OTP email.' });
            } else {
                return;
            }
        });


    } catch (error) {
        return error;
    }
};


module.exports = sendEmail;