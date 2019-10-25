const express = require('express');
const morgan = require('morgan');

const app = express();

var topMovies = [
  {
    title: 'Bohemian Rhapsody',
    genre: 'biographical drama',
    year: 2018
  },
  {
    title: 'Forrest Gump',
    genre: 'comedy drama',
    year: 1994
  },
  {
    title: 'Pretty Woman',
    genre: 'romantic comedy',
    year: 1990
  },
  {
    title: 'Breakfast at Tiffany\'s',
    genre: 'romantic comedy',
    year: 1961
  },
  {
    title: 'Django Unchained',
    genre: 'western',
    year: 2012
  },
  {
    title: 'Cars',
    genre: 'road comedy',
    year: 2006
  },
  {
    title: 'Notting Hill',
    genre: 'romantic comedy',
    year: 1999
  },
  {
    title: 'Romeo and Juliet',
    genre: 'romantic crime tragedy',
    year: 1996
  },
  {
    title: 'Solaris',
    genre: 'science fiction',
    year: 2002
  },
  {
    title: 'Gravity',
    genre: 'science fiction',
    year: 2013
  }
];

// Morgan middleware library used to log all requests to the terminal
app.use(morgan('common'));

// Serve static file(s) in public folder
app.use(express.static('public'));

// error-handling middleware function that logs application-level errors to terminal
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('An error occured');
});

// GET request
app.get('/', function(req, res) {
  var responseText =
    'Welcome to the myFlix app. It provides information about movies.';
  res.send(responseText);
});
app.get('/movies', function(req, res) {
  res.json(topMovies);
});

// listen for requests
app.listen(8080, function() {
  console.log('Your app is listening on port 8080');
});
