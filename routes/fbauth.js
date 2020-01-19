const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }))

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/user/login' }),
  function (req, res) {
    res.redirect('/');
  });

module.exports = router