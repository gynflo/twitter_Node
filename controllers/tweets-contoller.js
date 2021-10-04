
const { getTweets, createTweet, deleteTweet, getTweet, updateTweet } = require('../queries/tweet.queries');

exports.tweetList = async (req, res, next) => {
    try {
        const tweets = await getTweets();
        res.render('tweets/tweet', { tweets, isAuthenticated: req.isAuthenticated(), currentUser: req.user })
    } catch (error) {
        next(error)
    }
}

exports.tweetNew = (req, res) => {
    res.render('tweets/tweet-form', { tweet: {}, isAuthenticated: req.isAuthenticated(), currentUser: req.user })
}

exports.tweetCreate = async (req, res) => {
    try {
        const body = req.body;
        await createTweet({...body, author: req.user._id});
        res.redirect('/');
    } catch (e) {
        const errors = Object.keys(e.errors).map(key => e.errors[key].message)
        res.status(400).render('tweets/tweet-form', { errors, isAuthenticated: req.isAuthenticated(), currentUser: req.user  })
    }

}

exports.tweetDelete = async (req, res, next) => {
    try {
        const tweetId = req.params.tweetId;
        console.log('*', tweetId);
        await deleteTweet(tweetId);
        const tweets = await getTweets();
        res.render('tweets/tweet-list', { tweets });
    } catch (error) {
        next(error)
    }

}

exports.tweetEdit = async (req, res, next) => {
    try {
        const tweetId = req.params.tweetId;
        const tweet = await getTweet(tweetId);
        res.render('tweets/tweet-form', { tweet, isAuthenticated: req.isAuthenticated(), currentUser: req.user  })

    } catch (error) {
        next(error)
    }
}

exports.tweetUpdate = async (req, res, next) => {
    console.log('req.params ==>', req);
    const tweetId = req.params.tweetId
    try {
        const body = req.body;
        await updateTweet(tweetId, body);
        res.redirect('/tweets');
    } catch (e) {
        const errors = Object.keys(e.errors).map(key => e.errors[key].message)
        const tweet = await getTweet(tweetId);
        res.status(400).render('tweets/tweet-form', { errors, tweet, isAuthenticated: req.isAuthenticated(), currentUser: req.user  })
    }
}