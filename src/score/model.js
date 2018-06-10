const mongoose = require('mongoose');
const { Schema } = mongoose;

const ScoreSchema = new Schema({
  score: {
    type: Number,
  },
  date: {
    type: Date,
    required: true
  },
  userId: {
    type: String,
    ref: 'User'
  },
});

ScoreSchema.statics.getScores = function () {
  return this.find({})
  .sort('-score')
  .populate('userId')
  .exec();
}


const Score = mongoose.model('Score', ScoreSchema);
module.exports = Score;