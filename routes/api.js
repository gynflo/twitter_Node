const router = require('express').Router();
const tweets = require('./api.tweets')


// /api/tweets
router.use('/tweets', tweets);

module.exports = router