const express = require('express');
const bcrypt = require('bcrypt');
const renderTemplate = require('../../lib/renderReactModule');
const Auth = require('../../views/Auth');
const { User } = require('../../db/models');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.newUser || req.session.user) {
    res.redirect('/home');
  }
  renderTemplate(Auth, null, res);
});

router.post('/regisration', async (req, res) => {
  try {
    const regularka = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g;
    const { login, email, password } = req.body;
    if (regularka.test(password)) {
      const hash = await bcrypt.hash(password, 10);
      const newUser = await User.create({ login, email, password: hash });
      req.session.newUser = newUser.login;
      req.session.save(() => {
        if (req.session.newUser) {
          res.sendStatus(200);
        }
      });
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ where: { login } });
    const passCheck = await bcrypt.compare(password, user.password);
    if (passCheck) {
      req.session.user = user.login;
      if (req.session.user) {
        res.sendStatus(200);
      }
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get('/logout', (req, res) => {
  try {
    if (req.session.newUser || req.session.user) {
      req.session.destroy(() => {
        res.clearCookie('OwlCookie');
        res.redirect('/');
      });
    } else {
      res.redirect('/');
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
