var config = {};

config.admin={};

config.app={};
config.spotify={};

config.admin.name="Ruben Espinosa";
config.admin.email="";
config.app.name="Spotifly";
config.app.url="";
config.spotify.redirect_url = process.env.REDIRECT_URL;
config.spotify.client_id = process.env.CLIENT_ID;
config.spotify.client_secret = process.env.CLIENT_SECRET;

module.exports=config