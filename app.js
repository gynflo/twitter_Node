const express = require('express');
const morgan = require('morgan');
const path = require('path');
const errorhandler = require('errorhandler');
require('./database');


const app = express();
module.exports = app;

require('./config/session.config');
require('./config/passport.config');

const index = require('./routes');

// Permet de set par defaut le dossier views pour la methode render();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* **********
********MIDDLEWARE
 */

app.use(morgan('short'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(index)

/* **********
********ERROR_HANDLER
 */
if (process.env.NODE_ENV === 'development') {
    app.use(errorhandler);
} else {
    app.use((err, req, res, next) => {
        const code = err.code || 500;
        res.status(code).json({
            code: code,
            message: code === 500 ? null : err.massage
        })
    })
}




