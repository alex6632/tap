const mongoose = require('mongoose');

mongoose.Promise = global.Promise; 

const options = {
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: 30,
};

const initDatabase = () => {
  mongoose.connect(process.env.MONGO_URL, options)
    .then((data) => {}, (err) => {
      console.log('database error: ', err);
    })
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