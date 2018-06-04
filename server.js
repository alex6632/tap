require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();

/* Define db */
const db = require('./src/services/db');

/* Define routes */
let home = require('./src/user/routes');
let game = require('./src/game/routes');
let scores = require('./src/score/routes');


const init = () => {

  // DB
  db.initDatabase();
  
  // FRONT
  app.use(express.static(path.join(__dirname, 'www')));

  // BODY PARSER
  app.unsubscribe(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  
  // ROUTES
  app.use('/', home);
  app.use('/me', game);
  app.use('/tap', scores);
  
  // LISTEN
  app.listen(port, () => console.log(`Server watch on port -> ${port}`));
}

init();