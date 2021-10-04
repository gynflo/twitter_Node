const router = require('express').Router();
const users = require('./users.routes');
const tweets = require('./tweets.routes');
const auth = require('./auth.routes')

router.use('/users', users);
router.use('/tweets', tweets);
router.use('/auth', auth);


router.get('/', (req, res) => {
    res.redirect('/tweets')
})



module.exports = router;