/* eslint-disable max-len */
const express = require('express');
const { User, Account } = require('../../db/models');
const renderTemplate = require('../../lib/renderReactModule');
const Profile = require('../../views/Profile');

const router = express.Router();

router.get('/profile/:user', async (req, res) => {
  if (req.session.newUser || req.session.user) {
    const user = req.session.newUser || req.session.user;
    renderTemplate(Profile, { user }, res);
  } else {
    res.redirect('/auth');
  }
});
module.exports = router;
