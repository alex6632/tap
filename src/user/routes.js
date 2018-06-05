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
router.post('/auth/register', userController.register);
router.post('/auth/login', userController.login);

module.exports = router;