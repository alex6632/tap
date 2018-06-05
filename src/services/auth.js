const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../user/model');

const authentication = () => {
  passport.use(new LocalStrategy(
    {
      usernameField: 'email'
    },
    (username, password, done) => {
      User.findOne({email: username}, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (!user.checkPassword(password)) {
          return done(null, false);
        }
        return done(null, user);
      });
    }
  ));
}

module.exports = { 
  authentication,
};