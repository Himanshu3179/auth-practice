const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: 600 },
    },
});

const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;