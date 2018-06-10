const { Router } = require('express');
const router = Router({ mergeParams: true });
const jwt = require('express-jwt');
const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload',
});
//const access  = require('../services/utils');
const gameController = require('./controller');

router.get('/new-tap', auth, gameController.game);

module.exports = router;