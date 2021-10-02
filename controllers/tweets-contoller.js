const Tweet = require('../database/models/tweets.models')
const { getTweets, createTweet, deleteTweet, getTweet, updateTweet } = require('../queries/tweet.queries');

exports.tweetList = async (req, res, next) => {
    try {
        const tweets = await getTweets();
        res.render('tweets/tweet', { tweets })
    } catch (error) {
        next(error)
    }
}

exports.tweetNew = (req, res) => {
    res.render('tweets/tweet-form', { tweet: {} })
}

exports.tweetCreate = async (req, res) => {
    try {
        const body = req.body;
        await createTweet(body);
        res.redirect('/');
    } catch (e) {
        const errors = Object.keys(e.errors).map(key => e.errors[key].message)
        res.status(400).render('tweets/tweet-form', { errors })
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
        res.render('tweets/tweet-form', { tweet })

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
        res.status(400).render('tweets/tweet-form', { errors, tweet })
    }
}