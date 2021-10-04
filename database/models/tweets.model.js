const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
    content: {
        type: String,
        maxlength: [140, 'Tweet trop long'],
        minlength: [1, 'Tweet trop court'],
        required: [true, 'Tweet requis !']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user', 
        required: true
    }
});

const Tweet = mongoose.model('tweet', tweetSchema);

module.exports = Tweet;