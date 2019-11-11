/*
*********************************************************
Authentication logic:
- creating a new endpoint for registered users to log in
- authenticating users when log in with username + passsword
- generating JWT to authenticate future requests of users
*********************************************************
*/

var jwtSecret = 'your_jwt_secret'; // same key used in JWTStrategy, see passport.js
var jwt = require('jsonwebtoken');
const passport = require('passport');
require('./passport');

function generateJWTToken(user) {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, // Username encoding in JWT
    expiresIn: '7d', // Token will expire in 7 days
    algorithm: 'HS256' // Algorithm used to encode values of JWT
  });
}

// POST login. Here login action is implemented.
module.exports = function(router) {
  router.post('/login', function(req, res) {
    /*Calling passport authentication function with local strategy.
    Passed {session: false} in passport options to make sure that user isn't saved in session.*/
    passport.authenticate('local', { session: false }, function(
      error,
      user,
      info
    ) {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user
        });
      }
      req.login(user, { session: false }, function(error) {
        if (error) {
          res.send(error);
        }
        // if username and password in request body exist in db, generateJWTToken creates a JWT based on username and password.
        var token = generateJWTToken(user.toJSON());
        return res.json({ user, token }); // ES6 shorthand for: res.json({user: user, token: token})
      });
    })(req, res);
  });
};
