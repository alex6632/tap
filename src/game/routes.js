const { Router } = require('express');
const router = Router({ mergeParams: true });

router.get('/', (req, res, next) => {
  res.json({
    res: '/me ok'
  }).status(200);
});

module.exports = router;