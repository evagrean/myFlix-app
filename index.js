const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const app = express();

// Morgan middleware library used to log all requests to the terminal
app.use(morgan('common'));

// Body-parser middleware used to read the body of HTTP requests, expected in JSON format
app.use(bodyParser.json());

// Serve static file(s) in public folder
app.use(express.static('public'));

// error-handling middleware function that logs application-level errors to terminal
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('An error occured');
});

var Movies = [
  {
    id: 1,
    title: 'Bohemian Rhapsody',
    year: 2018,
    description: 'Description about Bohemian Rhapsody',
    genre: {
      name: 'biographical drama',
      description: 'Description of biographical drama'
    },
    director: {
      name: 'Bryan Singer',
      bio: 'Bio of Bryan Singer',
      birth: '1965',
      death: ''
    },
    imageURL: '',
    featured: ''
  },
  {
    id: 2,
    title: 'Forrest Gump',
    year: 1994,
    description: 'Description about Forrest Gump',
    genre: {
      name: 'comedy drama',
      description: 'Description of comedy drama'
    },
    director: {
      name: 'Robert Zemeckis',
      bio: 'Bio of Robert Zemeckis',
      birth: '1952',
      death: ''
    },
    imageURL: '',
    featured: ''
  }
];

var Genres = [
  {
    name: 'comedy drama',
    description: 'Description of comedy drama'
  },
  {
    name: 'biographical drama',
    description: 'Description of biographical drama'
  }
];

var Directors = [
  {
    name: 'Bryan Singer',
    bio: 'Bio of Bryan Singer',
    birth: '1965',
    death: ''
  },
  {
    name: 'Robert Zemeckis',
    bio: 'Bio of Robert Zemeckis',
    birth: '1952',
    death: ''
  }
];

var Users = [
  {
    id: 1,
    username: 'Polly Pocket',
    password: '',
    email: 'polly@pocket.com',
    birthday: ''
  }
];

// Returns the Homepage
app.get('/', function(req, res) {
  var responseText =
    'Welcome to the myFlix app. It provides information about movies.';
  res.send(responseText);
});

// Returns a list of data about all movies
app.get('/movies', function(req, res) {
  res.json(Movies);
});

// Returns data about a single movie by title
app.get('/movies/:title', function(req, res) {
  res.json(
    Movies.find(function(movie) {
      return movie.title === req.params.title;
    })
  );
});

// Returns data about a genre by name
app.get('/genres/:name', function(req, res) {
  res.json(
    Genres.find(function(genre) {
      return genre.name === req.params.name;
    })
  );
});

// Returns data about a director by name
app.get('/directors/:name', function(req, res) {
  res.json(
    Directors.find(function(director) {
      return director.name === req.params.name;
    })
  );
});

// Adds a new user
app.post('/users', function(req, res) {
  var newUser = req.body;

  if (!newUser.username) {
    var message = 'Missing username in request body';
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    Users.push(newUser);
    res.status(201).send(newUser);
  }
});

// Update user information by username
app.put('/users/:username', function(req, res) {
  // Checks whether object with same username as indicated in the requestURL has been found
  var user = Users.find(function(user) {
    return user.username === req.params.username;
  });
  res.send('Successful PUT request returning updated user information');
});

// Adds movie to list of favorites by ID
app.post('/users/:username/movies/:movieID', function(req, res) {
  res.send('Successful POST request returning list of favorites');
});

// Removes movie from list of favorites by ID
app.delete('/users/:username/movies/:movieID', function(req, res) {
  res.send('Successful DELETE request returning deleted movie');
});

// Removes user account by userID
app.delete('/users/:userID', function(req, res) {
  res.send('Successful DELETE request returning id of deleted user');
});

// listen for requests
app.listen(8080, function() {
  console.log('Your app is listening on port 8080');
});
