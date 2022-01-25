require('dotenv').config();


const express = require('express');
const hbs = require('hbs');



// require spotify-web-api-node package here:

const SpotifyWebApi = require('spotify-web-api-node');

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// setting the spotify-api goes here:

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET

  });
  
  // Retrieve an access token
  spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));

  

// Our routes go here:

app.get('/artist-search', (req, res) => {

  spotifyApi
  //This route will receive the search term from the query string, 
  //and make a search request using one of the methods of the Spotify npm package

  //i was checking https://developer.spotify.com/documentation/web-api/reference/#/operations/search
  //but im not sure how to make it work
  .searchArtists(req.query.artist)
  .then(data => {
    //console.log('The received data from the API: ', data.body);
    console.log(data.body)
    // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
    res.render('artist-search')
  })
  .catch(err => console.log('The error while searching artists occurred: ', err));

})
/* app.get('/artist-search-results', (req, res) => {
  res.render('artist-search-results')
 // res.send('test')
}) */

app.get('/albums', (req, res) => {
  res.render('albums')
 // res.send('test')
})

// a simple express route
app.get('/', (req, res) => {
    res.render('home')
   // res.send('test')
  })



app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));
