const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const mongoose = require('mongoose');
const Models = require('./models.js');
const passport = require('passport');
require('./passport');

// Initializing app variable
const app = express();

// Allowing Mongoose to connect to myFlixDB
mongoose.connect('mongodb://localhost:27017/myFlixDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('useFindAndModify', false);

// Morgan middleware library used to log all requests to the terminal
app.use(morgan('common'));

// Body-parser middleware used to read the body of HTTP requests, expected in JSON format
app.use(bodyParser.json());

// Authentication middleware. (app) argument ensures that Express is available in auth.js file
const auth = require('./auth')(app);

// Serve static file(s) in public folder
app.use(express.static('public'));

// error-handling middleware function that logs application-level errors to terminal
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('An error occured');
});

// Requiring the Mongoose models defined in models.js
const Movies = Models.Movie;
const Users = Models.User;

// Returns the Homepage
app.get('/', function(req, res) {
  var responseText =
    'Welcome to the myFlix app. It provides information about movies.';
  res.send(responseText);
});
/*
***************************************************
MOVIE Queries
***************************************************
*/

// Get all movies

app.get('/movies', passport.authenticate('jwt', { session: false }), function(
  req,
  res
) {
  Movies.find()
    .then(function(movies) {
      res.status(201).json(movies);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get single movie, by title

app.get(
  '/movies/:Title',
  passport.authenticate('jwt', { session: false }),
  function(req, res) {
    Movies.findOne({ Title: req.params.Title })
      .then(function(movie) {
        res.json(movie);
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

// Get data about genre, by name

app.get(
  '/movies/genres/:Name',
  passport.authenticate('jwt', { session: false }),
  function(req, res) {
    Movies.findOne({ 'Genre.Name': req.params.Name })
      .then(function(movie) {
        res.json(movie.Genre);
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

// Get data about a director, by name
app.get(
  '/movies/directors/:Name',
  passport.authenticate('jwt', { session: false }),
  function(req, res) {
    Movies.findOne({ 'Director.Name': req.params.Name })
      .then(function(movie) {
        res.json(movie.Director);
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

/*
*************************************
USER Queries
*************************************
*/

// Adds a new user
/* We'll expect JSON in this format
{
ID : Integer,
Username: String,
Password: String,
Email: String,
Birthday: Date
}*/
app.post('/users', function(req, res) {
  Users.findOne({ Username: req.body.Username })
    .then(function(user) {
      if (user) {
        return res.status(400).send(req.body.Username + ' already exists');
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
          .then(function(user) {
            res.status(201).json(user);
          })
          .catch(function(error) {
            console.log(error);
            res.status(500).send('Error: ' + error);
          });
      }
    })
    .catch(function(error) {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Get all users
app.get('/users', passport.authenticate('jwt', { session: false }), function(
  req,
  res
) {
  Users.find()
    .then(function(users) {
      res.status(201).json(users);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get a user by username
app.get(
  '/users/:Username',
  passport.authenticate('jwt', { session: false }),
  function(req, res) {
    Users.findOne({ Username: req.params.Username })
      .then(function(user) {
        res.json(user);
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send('Error: ' + error);
      });
  }
);

// Update user information, by username
/* We'll expect JSON in this format
{
  Username: String (required),
  Password: String (required),
  Email: String (required),
  Birthday: Date
}*/

app.put(
  '/users/:Username',
  passport.authenticate('jwt', { session: false }),
  function(req, res) {
    // Checks whether object with same username as indicated in the requestURL has been found
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        }
      },
      // makes sure that the updated document is returned
      { new: true },
      function(err, updatedUser) {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

// Adds movie to list of favorites by MovieID
app.post('/users/:Username/Movies/:MovieID', function(req, res) {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    { $push: { Favorites: req.params.MovieID } },
    { new: true },
    function(err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send('Error' + err);
      } else {
        res
          .status(201)
          .send(
            'The movie with ID ' +
              req.params.MovieID +
              ' was successfully added to list of favorites' +
              updatedUser
          );
      }
    }
  );
});

// Removes movie from list of favorites by ID
app.delete('users/:Username/Movies/:MovieID', function(req, res) {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    { $pull: { Favorites: req.params.MovieID } },
    { new: true },
    function(err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res
          .status(200)
          .send(
            'The movie with ID ' +
              req.params.MovieID +
              ' was successfully deleted from the list of favorites of ' +
              updatedUser.Username +
              ': ' +
              updatedUser.Favorites
          );
      }
    }
  );
});

// Delete user by username
app.delete(
  '/users/:Username',
  passport.authenticate('jwt', { session: false }),
  function(req, res) {
    Users.findOneAndRemove({ Username: req.params.Username })
      .then(function(user) {
        if (!user) {
          res.status(400).send(req.params.Username + ' was not found.');
        } else {
          res.status(200).send(req.params.Username + ' was deleted.');
        }
      })
      .catch(function(err) {
        console.error(err);
        res.status(400).send('Error: ' + err);
      });
  }
);

// listen for requests
app.listen(8080, function() {
  console.log('Your app is listening on port 8080');
});
