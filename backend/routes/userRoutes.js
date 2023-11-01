const express = require('express');
const { signup, login, getUserprofile, updateUserProfile, logout, requestPasswordReset, resetPassword } = require('../controllers/authControllers');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout)
router
    .route('/profile')
    .get(authMiddleware, getUserprofile)
    .put(authMiddleware, updateUserProfile);

// Define routes for password reset

router.post('/requestPasswordReset', requestPasswordReset);
router.post('/resetPassword', resetPassword)



module.exports = router;