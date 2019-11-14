# myFlix-app

This README contains technical and content-related details about the server-side component of the application "myFlix". 
"myFlix" is a web application that is hosted online and provides users with access to information about different movies, directors, and genres. Users are able to sign up, update their personal information, and create a list of their favorite movies. 
The server-side of the application (server, business logic, business layers) consists of a REST API and architected database built using JavaScript, Node.js, Express, and MongoDB.

The REST API can be accessed via commonly used HTTP methods (GET, POST, PUT, DELETE). CRUD is used to retrieve data from the database and store that data in a non-relational way.

## Features

* Allows users to see a list of all movies in the database
* Allows users to get detailed information about a single movie by movie title
* Allows users to get detailed information about a genre by genre name
* Allows users to get detailed information about a director by name
* Allows new users to create an user account
* Allows existing users to update their user info or to delete their account
* Allows existing users to add or remove movies to/from their list of favorites

## Dependencies

All packages available on npm.

* bcrypt
* body-parser
* cors
* express
* express-validator
* jsonwebtoken
* mongoose
* morgan
* passport
* passport-jwt
* passport-local
* uuid

## Endpoints


### Movie requests

**Request:** Get a list of all movies

**URL:** /movies

**HTTP Method:** GET

**Request body data format:** None

**Response body data format:** JSON Object holding data about all movies
