const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('./model');

// REGISTER
const register = async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const cgu = req.body.cgu;

  // Check data is string type
  if (typeof firstName !== 'string' || typeof lastName !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
    return res.json({
      err: true,
      data: null,
      message: 'Only string character are allowed',
    }).status(400);
  }

  const newUser = new User();

  newUser.firstName = firstName;
  newUser.lastName = lastName;
  newUser.email = email;

  const hash = await newUser.setPassword(password);
  if (hash.err || hash.data === null) {
    return res.json({
      err: true,
      data: null,
      message: 'Bcrypt failed',
    });
  }
  newUser.hash = hash.data;

  // Check data is not empty
  if (firstName === '' || typeof lastName === '' || typeof email === '' || typeof password === '') {
    return res.json({
      err: true,
      data: null,
      message: 'Necessary field',
    }).status(400);
  }

  // Check cgu is checked
  if (!cgu) {
    return res.json({
      err: true,
      data: null,
      message: 'Necessary accept cgu',
    });
  }

  // Save new user
  newUser.save((err) => {
    console.log(err);
    if (err) {
      return res.json({
        err: true,
        data: null,
        message: 'User register failed',
      }).status(500);
    }
    let token;
    token = newUser.generateJwt();
    res.status(200);
    res.json({
      "token": token
    });
  });
}

// LOGIN
const login = (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    let token;
    if (err) {
      res.status(404).json(err);
      return;
    }

    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token": token,
        "message": `login success for user '${user.firstName} ${user.lastName}'`
      })
    } else {
      res.status(401).json(info);
    }
  })(req, res);
}

module.exports = {
  register,
  login
};