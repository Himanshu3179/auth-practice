const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');


exports.connectDB = asyncHandler(async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`)
})