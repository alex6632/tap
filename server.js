require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();
const passport = require('passport');

/* Define db */
const db = require('./src/services/db');
const auth = require('./src/services/auth');

/* Define routes */
let home = require('./src/user/routes');
let game = require('./src/game/routes');
let scores = require('./src/score/routes');


const init = () => {

  // DB
  db.initDatabase();

  // AUTHENTICATION
  auth.authentication();
  
  // FRONT
  //app.use(express.static(path.join(__dirname, 'www')));

  // BODY PARSER
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  
  // PASSPORT INITIALISATION
  app.use(passport.initialize());

  // ROUTES
  app.use('/', home);
  app.use('/me', game);
  app.use('/tap', scores);

  // CATCH UNAUTHORIZED ERRORS
  app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401);
      res.json({"message" : err.name + ": " + err.message});
    }
  });
  
  // LISTEN
  app.listen(port, () => console.log(`Server watch on port -> ${port}`));
}

init();