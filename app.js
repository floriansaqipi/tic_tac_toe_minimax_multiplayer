const path = require('path');
const express = require('express');

const playerRoutes = require('./routes/player');

const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(playerRoutes);

app.use((req, res, next) => {
    res.status(404).render('404');
});

app.listen(3000);