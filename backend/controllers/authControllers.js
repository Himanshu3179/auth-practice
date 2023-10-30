const User = require("../models/User");
const asyncHandler = require('express-async-handler');
const generateToken = require("../utils/generateToken");


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
    console.log("hello")
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
}