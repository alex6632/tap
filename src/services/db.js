const mongoose = require('mongoose');

const initDatabase = () => {
  mongoose.connect(process.env.MONGO_URL);
}

const closeDatabase = () => {
  mongoose.connection.close();
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = {
  initDatabase,
  closeDatabase,
}