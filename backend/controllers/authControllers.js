const User = require("../models/User");
const asyncHandler = require('express-async-handler');
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const bcryptSalt = process.env.BCRYPT_SALT;
const clientURL = process.env.CLIENT_URL;
const Token = require('../models/Token')
// signup
exports.signup = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
        throw new Error("Email already exists!");
    }
    user = new User({ name, email, password });
    await user.save();
    generateToken(res, user._id);
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
    });

});

// login
exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
        throw new Error("Email does not exist!");
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        throw new Error("Invalid credentials!");
    }
    generateToken(res, user._id);
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
    });
})

// profile
exports.getUserprofile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user);
    console.log(user)
    if (!user) {
        throw new Error("User not found!");
    }
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
    });
})

// update profile   
exports.updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user);
    if (!user) {
        throw new Error("User not found!");
    }
    user.name = req.body.name || user.name;
    if (req.body.password) {
        user.password = req.body.password;
    }
    await user.save();
    generateToken(res, user._id);
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
    });
});

// logout
exports.logout = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
}

exports.requestPasswordReset = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User not found!");
    }
    let token = await Token.findOne({ userId: user._id });
    if (token) await token.deleteOne();
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));
    await new Token({
        userId: user._id,
        token: hash,
        createdAt: Date.now(),
    }).save();
    const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;
    sendEmail(user.email,
        "Password Reset Request",
        { name: user.name, link: link },
    );

    res.json({ message: "Password reset link sent successfully!" });

});

exports.resetPassword = asyncHandler(async (req, res) => {
    const { userId, token, password } = req.body;
    let passwordResetToken = await Token.findOne({ userId });
    if (!passwordResetToken) {
        console.log(userId, token, passwordResetToken)
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

    sendEmail(user.email, "passwordreset", {
        name: user.name,
    });

    await passwordResetToken.deleteOne();

    res.json({ message: "Password reset successfully!" });

});

