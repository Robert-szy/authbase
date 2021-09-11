const express = require('express');
const cors = require('cors');
const path = require('path');
const hbs = require('express-handlebars');

const passport = require('passport');
const session = require('express-session');
const passportConfig = require('./config/passport');

const app = express();

// init session mechanism
app.use(session({ secret: 'jhg)*jhgjhggAS543ss' }));

// init passport
app.use(passport.initialize());
app.use(passport.session());

// set handlebars as view engine
app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', '.hbs');

// standard middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/auth', require('./routes/auth.routes'));
app.use('/user', require('./routes/user.routes'));

const isLogged = (req, res, next) => {
  if(!req.user){
    res.render('noPermission');
  } else {
    next();
  }
};

app.get('/user/profile', isLogged, (req, res) => {
    res.render('userProfile');
});

app.get('/user/profile/settings', isLogged, (req, res) => {
  res.render('userProfileSettings');
});

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/', (req, res) => {
  res.status(404).render('notFound');
});

app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});
