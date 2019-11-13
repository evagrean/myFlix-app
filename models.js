const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  ReleaseYear: String,
  Description: { type: String, required: true },
  Genre: {
    Name: String,
    Bio: String
  },
  Director: {
    Name: String,
    Bio: String,
    Birth: String,
    Death: String
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean
});

var userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  Favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

// hashPassword does the hashing for submitted passwords
userSchema.statics.hashPassword = function(password) {
  return bcrypt.hashSync(password, 10);
};

// validatePassword compares submitted hashed pw with hashed pw stored in db
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.Password);
};

var Movie = mongoose.model('Movie', movieSchema);
var User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
