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

### Get a list of all movies

**Endpoint:** /movies

**HTTP Method:** GET

**Request body data format:** None

**Response body data format:** JSON Object holding data about all movies


### Get data about a single movie by title

**Endpoint:** /movies/[Title]

**Query Parameters:** [Title] of movie

**HTTP Method:** GET

**Request body data format:** None

**Response body data format:** JSON object holding data about a single movie, containing title, description, genre, director, imageURL, featured or not. 
Example:

{
    "Genre": {
        "Name": "Musical Drama",
        "Description": "This movie type features a dramatic plot with a strong musical presence. Often concerning people connected to the entertainment business in some form, the soundtrack is often used to comment or illustrate on the mood of the characters."
    },
    "Director": {
        "Name": "Brian Singer",
        "Bio": "Hailed as one of the film industry`s most exciting and provocative new talents after the huge success of The Usual Suspects (1995), director Bryan Singer has built his reputation on making films that are essentially lengthy, verbally dexterous flirtations with the darker side of human nature.",
        "Birth": "1965",
        "Death": null
    },
    "Actors": [],
    "_id": "5dbc2d5e1c8922ba13eb0367",
    "Title": "Bohemian Rhapsody",
    "ReleaseYear": "2018",
    "Description": "A chronicle of the rock band Queen, who rose to fame thanks to their revolutionary sound and the theatrics of their front man, the iconic Freddie Mercury, culminating in their reunion for the historic set they played at Live Aid in July 1985.",
    "ImagePath": "https://www.allmovie.com/movie/bohemian-rhapsody-v670695",
    "Featured": true
}
