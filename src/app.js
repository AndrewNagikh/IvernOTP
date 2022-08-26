require('dotenv').config();

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const { sequelize } = require('../db/models');
const renderTemplate = require('../lib/renderReactModule');
const indexRout = require('./routes/indexRoutes');
const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/homeRoutes');
const championRoutes = require('./routes/championRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public/')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { PORT, SESSION_SECRET } = process.env;

const sessionConfig = {
  name: 'OwlCookie',
  store: new FileStore(),
  secret: SESSION_SECRET ?? 'your key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 10,
    httpOnly: true,
  },
};

app.use(session(sessionConfig));

app.use('/', indexRout);
app.use('/auth', authRoutes);
app.use('/home', homeRoutes);
app.use('/', championRoutes);
app.use('/', profileRoutes);

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Соединение с базой установлено!');
  } catch (err) {
    console.log(err, 'Error!');
  }
  console.log(`Сервер поднят на ${PORT} порту!`);
});
