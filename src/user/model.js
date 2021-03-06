const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hash: String,
});


UserSchema.methods.setPassword = function (password) {
  // Generate Salt
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return reject({ err, data: null });
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          return reject({ err, data: null });
        }
        return resolve({ data: hash });
      });
    });
  });
}

UserSchema.methods.checkPassword = function (password) {
  return new Promise((resolve, reject) => {
    console.log('hash',this.hash)
    bcrypt.compare(password, this.hash, (err, data) => {
      if (err || data === false) {
        return reject({ data: null, err });
      }
      return resolve({ data, err: null });
    });
  });
}

UserSchema.methods.generateJwt = function () {
  let expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    exp: parseInt(expiry.getTime() / 1000),
  }, process.env.JWT_SECRET);
}

const User = mongoose.model('User', UserSchema);
module.exports = User;