const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: String,
  // TODO: other fields...
});

UserSchema.methods.generateJwt = () => {
  // TODO: set date + sign jwt
};

const User = mongoose.model('User', UserSchema);
module.exports = User;