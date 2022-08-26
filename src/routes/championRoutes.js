const express = require('express');
const renderTemplate = require('../../lib/renderReactModule');
const Champion = require('../../views/Champion');

const router = express.Router();

router.get('/:championId', (req, res) => {
  if (req.session.newUser || req.session.user) {
    const { championId } = req.params;
    const user = req.session.newUser || req.session.user;
    renderTemplate(Champion, { user, championId }, res);
  } else {
    res.redirect('/auth');
  }
});

module.exports = router;
