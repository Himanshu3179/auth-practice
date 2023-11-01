const JWT = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const JWTSecret = process.env.JWT_SECRET;
const bcryptSalt = process.env.BCRYPT_SALT;
const clientURL = process.env.CLIENT_URL;
const Token = require('../models/Token')

const requestPasswordReset = async (email) => {
    


};

const resetPassword = async (userId, token, password) => {
    let passwordResetToken = await Token.findOne({ userId });

    if (!passwordResetToken) {
        throw new Error("Invalid or expired password reset token");
    }

    console.log(passwordResetToken.token, token);

    const isValid = await bcrypt.compare(token, passwordResetToken.token);

    if (!isValid) {
        throw new Error("Invalid or expired password reset token");
    }

    const hash = await bcrypt.hash(password, Number(bcryptSalt));

    await User.updateOne(
        { _id: userId },
        { $set: { password: hash } },
        { new: true }
    );

    const user = await User.findById({ _id: userId });

    sendEmail(
        user.email,
        "Password Reset Successfully",
        {
            name: user.name,
        },
    );

    await passwordResetToken.deleteOne();



};

module.exports = {
    requestPasswordReset,
    resetPassword,
};