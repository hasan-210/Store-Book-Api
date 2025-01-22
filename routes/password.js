const express = require('express');
const { getForgotPasswordView, sendForgotPasswordLink, getResetPAsswordView, resetThePassword } = require('../controllers/passwordController');
const router = express.Router();

// /password/forgot-password
router.route('/forgot-password')
               .get(getForgotPasswordView)
               .post(sendForgotPasswordLink);
// /password/reset-password/:userId/:token
router.route('/reset-password/:userId/:token')
      .get(getResetPAsswordView)
      .post(resetThePassword)
module.exports = router