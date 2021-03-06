require('dotenv').config()
const config = require('./config.js');

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const spotify = require('./routes/spotify');

app.use(express.static(__dirname + '/src'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/spotify', spotify);
app.use('*', express.static(__dirname + '/src'));

if (config.app.environment === "development") {
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'src/index.html')));
    res.end();
  });
} else {
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'src/index.html'));
  });
}

http.createServer(app).listen(config.app.port);

module.exports = app;
