const express = require('express');

const adminRouter = express.Router();

const { getAllUsers } = require('../controllers/adminControllers');
const adminMiddleware = require('../middlewares/adminMiddleware');


adminRouter.use(adminMiddleware);

adminRouter.get('/users', getAllUsers);

module.exports = adminRouter;