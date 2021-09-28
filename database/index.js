const mongoose = require('mongoose');

exports.clientPromise = mongoose
    .connect('mongodb+srv://gynflo:eexouthe@makedesignlyon.5ycfo.mongodb.net/twitter?retryWrites=true&w=majority')
    .then(() => console.log('Connexion DB Twitter OK'))
    .catch(err => console.log(err))