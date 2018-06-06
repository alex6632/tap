const { Router } = require('express');
const router = Router({ mergeParams: true });
const jwt = require('express-jwt');
const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload',
});
const access  = require('../services/utils');

/* /me -> game route */
router.get('/me', auth, access.hasAccess);

module.exports = router;