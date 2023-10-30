const express = require('express');
const { signup, login, profile, getUserprofile, updateUserProfile, logout } = require('../controllers/authControllers');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout)
router
    .route('/profile')
    .get(authMiddleware, getUserprofile)
    .put(authMiddleware, updateUserProfile);

module.exports = router;