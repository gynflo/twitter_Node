const Tweet = require('../database/models/tweets.models')
const { getTweets, createTweet, deleteTweet } = require('../queries/tweet.queries');

exports.tweetList = async (req, res, next) => {
    try {
        const tweets = await getTweets();
        res.render('tweets/tweet', { tweets })
    } catch (error) {
        next(error)
    }
}

exports.tweetNew = (req, res) => {
    res.render('tweets/tweet-form')
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
        console.log('*',tweetId);
        await deleteTweet(tweetId);
        const tweets = await getTweets();
        res.render('tweets/tweet-list', { tweets });
    } catch (error) {
        next(error)
    }

}