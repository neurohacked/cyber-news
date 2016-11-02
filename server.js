const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const app_controller = require('./controllers/app_controller');

const app = express();

// use morgan and bodyparser with our app
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));

// make public a static dir
app.use(express.static('public'));

// Database configuration with mongoose
mongoose.connect('mongodb://heroku_fp3n99k8:hsbj5sdtc4fjc638g2c1d6v21a@ds141697.mlab.com:41697/heroku_fp3n99k8');
const db = mongoose.connection;

// show any mongoose errors
db.on('error', function(err) {
    console.log('Mongoose Error: ', err);
});

// once logged in to the db through mongoose, log a success message
db.once('open', function() {
    console.log('Mongoose connection successful.');
});

app.use('/', app_controller);

// listen on port 3000
app.listen(3000, function() {
    console.log('App running on port 3000!');
});

module.exports = app;
