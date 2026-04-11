const express = require('express');
const { signUp, signIn, verifyTokens, logOut, forgotPassword, resetPassword, changePassword, refreshToken, verifyEmail, senOTP } = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');
const passport = require('passport');
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/logout', logOut);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/change-password', verifyToken, changePassword);
router.post('/refresh-token', refreshToken);
router.post('/verify-email', verifyToken, verifyEmail);
router.get('/verify-token', verifyToken, verifyTokens);
router.post('send-otp', senOTP)
router.get(
    '/google',
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);

router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", (err, user, info) => {

    if (err) return next(err);

    if (!user) {
      return res.redirect(
        `${process.env.CLIENT_URL}/oauth-success?error=${encodeURIComponent("User not registered. Please signup.")}`
      );
    }

    // 🔐 Generate JWT
    const access_token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN }
    );

    console.log("acces_token", access_token);

    // 👉 Send token to frontend
    res.redirect(`${process.env.CLIENT_URL}/oauth-success?access_token=${access_token}&user=${encodeURIComponent(JSON.stringify(user))}`);
  })(req, res, next);
});

module.exports = router;