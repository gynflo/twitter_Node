const mongoose = require('mongoose');

exports.clientPromise = mongoose
    .connect(process.env.DB_HOST, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .catch(err => console.log(err))