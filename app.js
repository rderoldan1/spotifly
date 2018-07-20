require('dotenv').config()
const config = require('./config.js');

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const devConfig = require('./config/webpack.development.config.js');

const spotify = require('./routes/spotify');

app.use(express.static(__dirname + '/src'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/spotify', spotify);

app.use('*', express.static(__dirname + '/src'));

if (config.app.environment === "development") {
  const compiler = webpack(devConfig);
  const middleware = webpackMiddleware(compiler, {
    publicPath: devConfig.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'src/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/src'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'src/index.html'));
  });
}

http.createServer(app).listen(config.app.port);

module.exports = app;
