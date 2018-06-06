const { Router } = require('express');
const router = Router({ mergeParams: true });
const jwt = require('express-jwt');
const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload',
});
const userController = require('./controller');

/* /me -> game route */
router.get('/', (req, res) => {
  res.json({
    'home': 'ok',
  })
});

/* Auth routes */
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;