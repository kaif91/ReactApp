const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const mongoose = require('mongoose');
const keys=require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI, function() { /* dummy function */ })
    .then(() => {
        //return server.start();
    })
    .catch(err => { // mongoose connection error will be handled here
        console.error('App starting error:', err.stack);
        process.exit(1);
    });

//create express server
const app = express();
app.use(cookieSession({
  maxAge: 30 * 24 *60 * 60 * 1000,
  keys: [keys.cookieKey]
})
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

//define prot for heroku or for local dev
const PORT=  process.env.PORT || 5000;
//start listening on given port
app.listen(PORT);
