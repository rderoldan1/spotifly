require('dotenv').config()

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();

const users = require('./routes/users');
const spotify = require('./routes/spotify');

app.use(express.static(__dirname + '/src'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', users);
app.use('/spotify', spotify);

app.use('*', express.static(__dirname + '/src'));

http.createServer(app).listen(3000);

module.exports = app;
