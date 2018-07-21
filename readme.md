### Spotifly

Tiny app using React to fetch data from spotify, You can check the live version on https://spotifly1.herokuapp.com/ 

# Requirements 

* Nodejs
* Redux

# Instalation and development

1. Install dependencies with `$ npm install`
2. Create an `.env` file project's root, set the following env vars

       REDIRECT_URL=http://localhost:3000/spotify/callback
       CLIENT_ID=YourSpotifyClientID
       CLIENT_SECRET=YourSpotifyClientSecret
       ENVIRONMENT=development
       PORT=3000

3. Start the server `npm start`
4. Open your browser on `http://localhost:3000`

# Deployment 

1. Build the project for production `$ npm run build`
2. Be sure to commit `src/public/client.min.js` and deploy it to your server
3. Export the environment variables, be sure to set `ENVIRONMENT=production`
4. on your server, run `node app.js` 

![alt](https://github.com/rderoldan1/spotifly/raw/master/imgs/1.png)
![alt](https://github.com/rderoldan1/spotifly/raw/master/imgs/2.png)
![alt](https://github.com/rderoldan1/spotifly/raw/master/imgs/3.png)
