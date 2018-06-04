const { Router } = require('express');
const router = Router({ mergeParams: true });

let mongodb = require('mongodb');
let ObjectId = mongodb.ObjectID;

const passport = require('passport');

router.get('/', (req, res) => {

  
});

module.exports = router;