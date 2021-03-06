const express = require('express');
const mongoos = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
// const cookieSession = require('cookie-session');
require('./models/User');
require('./services/passport');


mongoos.connect(keys.mongoURI);

const app = express ();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60* 1000, 
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize() );
app.use(passport.session()); 

require ('./routes/authRoutes')(app);

const PORT = process.env.PORT  || 5000;
app.listen(PORT);