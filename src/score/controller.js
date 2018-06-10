const mongoose = require('mongoose');
const Score = require('../score/model');
const hasAccess = require('../services/utils');

// NEW SCORE
const add = (req, res) => {
  const score = req.body.score;
  const date = req.body.date;
  const userId = req.body.userId;

  //console.log(req.body);
  const newScore = new Score();

  newScore.score = score;
  newScore.date = date;
  newScore.userId = userId;

  newScore.save((err) => {
    console.log(err);
    if (err) {
      return res.json({
        err: true,
        data: null,
        message: 'Save score failed',
      }).status(500);
    }
    res.status(200);
    res.json({
      "score": "saved"
    });
  });
}

// GET ALL SCORES
const scores = (req, res) => {
  return Score.getScores()
  .then((scores) => {
    console.log(scores)
    return res.json({
      data: scores
    }).status(200)
  })
  .catch((err) => {
    console.log(err)
    return res.json({
      err: true,
      data: null,
      message: 'Can\'t get scores',
    }).status(500);
  })
}

module.exports = {
  add,
  scores,
}