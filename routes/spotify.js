const express = require('express');
const config = require('../config.js');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: config.spotify.client_id,
  clientSecret:  config.spotify.client_secret,
  redirectUri:  config.spotify.redirect_url
});

router.get('/login', function(req, res, next) {
  const scopes = ['user-read-private', 'user-read-email', 'user-read-playback-state'];
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes);
  console.log(authorizeURL);
  res.redirect(authorizeURL);
});

router.get('/callback', function(req, res, next) {
  const code = req.query.code;

  spotifyApi.authorizationCodeGrant(code).then(
    function(data){
      const access_token = data.body['access_token']
      res.cookie('access_token', access_token)
      res.redirect('/search');
    }
  )
});

module.exports = router;
