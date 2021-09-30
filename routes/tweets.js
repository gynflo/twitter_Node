const router = require('express').Router();
const { tweetList, tweetNew, tweetCreate, tweetDelete } = require('../controllers/tweets-contoller')


//tweets/new
router.get('/new', tweetNew)
// /tweets
router.get('/', tweetList)
router.post('/', tweetCreate)
router.delete('/:tweetId', tweetDelete)

module.exports = router;