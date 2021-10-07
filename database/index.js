const mongoose = require('mongoose');
const env = require(`../environment/${ process.env.NODE_ENV}`);

exports.clientPromise = mongoose
    .connect(process.env.DB_HOST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch(err => console.log(err))