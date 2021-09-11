const express = require('express');
const router = express.Router();

router.get('/logged', (req, res) => {
  res.render('logged', {'user': req.user.displayName});
  console.log('namereq', req.user.displayName);
});

router.get('/no-permission', (req, res) => {
  res.render('noPermission');
});

router.get('/logout', (req, res) => {
  res.render('loggedOut');
});

module.exports = router;