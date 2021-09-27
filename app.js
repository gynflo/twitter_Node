const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const index = require('./routes');

// permet de set par defaut le dossier views pour la methode render();
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


app.listen(port)