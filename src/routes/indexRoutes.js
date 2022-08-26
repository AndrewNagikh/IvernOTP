const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.newUser || req.session.user) {
    res.redirect('/home');
  } else {
    res.redirect('/auth');
  }
});

module.exports = router;
