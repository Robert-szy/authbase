const express = require('express');
const router = express.Router();

router.get('/profile', (req, res) => {
  logged = req.user;
  res.render('userProfile');
});

router.get('/profile/settings', (req, res) => {
  res.render('userProfileSettings');
});


router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/user/no-permission' }),
  (req, res) => {
    res.redirect('/user/logged');
  }
);

module.exports = router;