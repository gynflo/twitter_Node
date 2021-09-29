const mongoose = require('mongoose');

exports.clientPromise = mongoose
    .connect(process.env.DB_HOST)
    .then(() => console.log('Connexion DB Twitter OK'))
    .catch(err => console.log(err))