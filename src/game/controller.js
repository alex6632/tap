const mongoose = require('mongoose');
const User = require('../user/model');

const game = (req, res) => {
  if(!req.payload._id) {
    return res.status(401).json({
      "message": "Unauthorized",
    })
  }
  User.findById(req.payload._id).exec((err, user) => {
    res.status(200).json(user);
  });
}

module.exports = {
  game,
}