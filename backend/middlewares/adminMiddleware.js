const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');


const adminMiddleware = asyncHandler(async (req, res, next) => {

    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ msg: "You are not authorized!" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password');
        if (req.user.role !== 'admin') {
            return res.status(401).json({ msg: "You are not admin!" });
        }
        next();
    } catch (error) {
        return res.status(401).json({ msg: "You are not authorized!" });
    }
})

module.exports = adminMiddleware;