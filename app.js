const express = require('express');
const morgan = require('morgan');
const path = require('path');
const errorhandler = require('errorhandler');

const app = express();
exports.app = app;
const port = process.env.PORT || 3000;
const index = require('./routes');
require('dotenv').config()
require('./database');
require('./config/session.config');
require('./config/passport.config');

// Permet de set par defaut le dossier views pour la methode render();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* **********
********MIDDLEWARE
 */

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

app.use(morgan('short'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(index)


app.listen(port)