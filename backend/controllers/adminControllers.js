const User = require("../models/User");
const asyncHandler = require('express-async-handler');

exports.getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});