const { Router } = require('express');
const router = Router({ mergeParams: true });
const jwt = require('express-jwt');
const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload',
});
const scoreController = require('./controller');

router.get('/scores', auth, scoreController.scores);
router.post('/score', auth, scoreController.add);

module.exports = router;