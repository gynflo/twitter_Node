const router = require('express').Router();
const { tweetList, tweetNew, tweetCreate, tweetDelete, tweetEdit, tweetUpdate } = require('../controllers/tweets.controller')



// /tweets/new
router.get('/new', tweetNew)
// /tweets
router.get('/', tweetList)
router.post('/', tweetCreate)
router.delete('/:tweetId', tweetDelete)
// /edit
router.get('/edit/:tweetId', tweetEdit);
router.post('/update/:tweetId', tweetUpdate )

module.exports = router;