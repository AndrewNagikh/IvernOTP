const express = require('express');
const renderTemplate = require('../../lib/renderReactModule');
const Home = require('../../views/Home');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.newUser || req.session.user) {
    const user = req.session.newUser || req.session.user;
    renderTemplate(Home, { user }, res);
  } else {
    res.redirect('/auth');
  }
});

module.exports = router;
