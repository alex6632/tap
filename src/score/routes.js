const { Router } = require('express');
const router = Router({ mergeParams: true });

router.get('/', (req, res) => {
  res.json({
    res: '/tap ok'
  }).status(200);
});

module.exports = router;