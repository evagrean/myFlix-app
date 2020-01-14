# myFlix-app

Project built as part of CareerFoundry's Full-Stack-Web-Development-Course to demonstrate the mastery of full-stack JavaScript develpoment with MERN stack.

This README contains technical and content-related details about the [server-side](#Server-side) and [client-side](#Client-side) component of a React application called "myFlix". 
The REST API for "myFlix" is hosted online on Heroku and provides logged in users with access to information about different movies, directors, and genres. For detailed information about all the provided features, see [Features](#Features) sector.
The server-side of the application (server, business logic, business layers) consists of a REST API and architected database built using JavaScript, Node.js, Express, and MongoDB.

The REST API can be accessed via commonly used HTTP methods (GET, POST, PUT, DELETE). CRUD is used to retrieve data from the database and store that data in a non-relational way.

# Server-side

## Features

* Allows users to see a list of all movies in the database
* Allows users to get detailed information about a single movie by movie title
* Allows users to get detailed information about a genre by genre name
* Allows users to get detailed information about a director by name
* Allows new users to create an user account
* Allows existing users to update their user info or to delete their account
* Allows existing users to add or remove movies to/from their list of favorites

## Dependencies

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

**Response Example:**
```
{   
    "id": "5dbc2d5e1c8922ba13eb0367",
    "Title": "Bohemian Rhapsody",
    "ReleaseYear": "2018",
    "Description": "A chronicle of the rock band Queen, who rose to fame thanks to their revolutionary sound and the theatrics of their      front man, the iconic Freddie Mercury, culminating in their reunion for the historic set they played at Live Aid in July 1985.",
    "Genre": {    
        "Name": "Musical Drama",        
        "Description": "This movie type features a dramatic plot with a strong musical presence. Often concerning people connected to the entertainment business in some form, the soundtrack is often used to comment or illustrate on the mood of the characters."        
    },
    "Director": {
        "Name": "Brian Singer",
        "Bio": "Hailed as one of the film industry's most exciting and provocative new talents after the huge success of The Usual Suspects (1995), director Bryan Singer has built his reputation on making films that are essentially lengthy, verbally dexterous flirtations with the darker side of human nature.",
        "Birth": "1965",
        "Death": null
    },
    "Actors": [],    
    "ImagePath": "https://www.allmovie.com/movie/bohemian-rhapsody-v670695",
    "Featured": true
}
```

### Get data about a genre by name

**Endpoint:** /movies/genres/[Name]

**Query Parameters:** [Name] of genre

**HTTP Method:** GET

**Request body data format:** None

**Response body data format:** A JSON object holding data about a movie genre containing name and description.

**Response Example:**
```
{
    "Name": "Musical Drama",
    "Description": "This movie type features a dramatic plot with a strong musical presence. Often concerning people connected to the entertainment business in some form, the soundtrack is often used to comment or illustrate on the mood of the characters."
}
```


### Get data about a director by name

**Endpoint:** /movies/directors/[Name]

**Query Parameters:** [Name] of director

**HTTP Method:** GET

**Request body data format:** None

**Response body data format:** JSON object holding data about a director, containing name, bio, date of birth and death if existing.

**Response Example:**
```
{
    "Name": "Sofia Coppola",
    "Bio": "The daughter of filmmakers Eleanor and Francis Ford Coppola, she made her film debut as an infant in her father`s acclaimed crime drama film, The Godfather (1972). Coppola later appeared in a supporting role in Peggy Sue Got Married (1986) and portrayed Mary Corleone, the daughter of Michael Corleone, in The Godfather Part III (1990). Her performance in the latter was severely criticised, and she turned her attention to filmmaking.",
    "Birth": "1971",
    "Death": null
}
```


### Get a list of all users

**Endpoint:** /users

**HTTP Method:** GET

**Request body data format:** None

**Response body data format:** JSON object holding data about all users.


### Get a user by username

**Endpoint:** /users/[Username]

**Query Parameters:** [Username] of user

**HTTP Method:** GET

**Request body data format:** None

**Response body data format:** JSON object holding data about a single user.

**Response Example:**
```
{
    "Favorites": [],
    "_id": "5dcbfa7031b7860017f6ea43",
    "Username": "Sammy123",
    "Password": "$2b$10$Pewtk7wMnqGaKgiifUrBJ.IU/yUIIYZZTqpBFSWTluso7Oqp.eeU2",
    "Email": "sammy123@gmail.com",
    "Birthday": "1984-02-06T00:00:00.000Z",
    "__v": 0
}
```


### Add a new User

**Endpoint:** /users

**HTTP Method:** POST

**Request body data format:** JSON object holding data about a user, structured like:

**Request Example:**
```
{     
        "Username": "Loreley",
        "Password": "passit",
        "Email": "lorymail@gmail.com",
        "Birthday": "1984-02-06T00:00:00.000Z"       
}
```

**Response body data format:** JSON object holding data about the user that was added, including an ID and a "Favorites" key.

**Response Example:**
```
{
    "Favorites": [],
    "_id": "5dcd116a4aeeaa001759c134",
    "Username": "Loreley",
    "Password": "$2b$10$yLdpCBJOFrCgUsxe.b.BHO5XVpu3BaXwEDJKXKdZ3t0hU95Lg.AJ2",
    "Email": "lorymail@gmail.com",
    "Birthday": "1984-02-06T00:00:00.000Z",
    "__v": 0
}
```


### Update user info by username

**Endpoint:** /users/[Username]

**Query Parameter:** [Username] of user

**HTTP Method:** PUT

**Request body data format:** JSON object holding data to be updated, structured like:

**Request Example:**
```
{
    "Username": "SuperMario123",
    "Password": "getNewPassword",
    "Email": "SuperMario123@gmail.com",
    "Birthday": "1984-02-06T00:00:00.000Z"    
}
```

**Response body data format:** JSON data holding updated user info.

**Response Example:**
```
{
    "Favorites": [
        "5dbc29331c8922ba13eb0361",
        "5dbc27dc1c8922ba13eb035f"
    ],
    "_id": "5dca6f0e309c02bd94b20429",
    "Username": "SuperMario123",
    "Password": "getNewPassword",
    "Email": "SuperMario123@gmail.com",
    "Birthday": "1984-02-06T00:00:00.000Z"
}
```


### Add a movie to list of favorites by movie ID

**Endpoint:** /users/[Username]/Movies/[MovieID]

**Query Parameter:** [Username] of user and [MovieID]

**HTTP Method:** POST

**Request body data format:** None

**Response body data format:** A text message indicating the movie was added to the list of favorites and the updated list of favorites.

**Response Example:**
```
The movie with ID 5dbc2a891c8922ba13eb0363 was successfully added to list of favorites. Favorites of SuperMario123:
5dbc29331c8922ba13eb0361,5dbc27dc1c8922ba13eb035f,5dbc2a891c8922ba13eb0363
```


### Delete a movie from list of favorites by movie ID

**Endpoint:** /users/[Username]/Movies/[MovieID]

**Query Parameter:** [Username] of user and [MovieID]

**HTTP Method:** DELETE

**Request body data format:** None

**Response body data format:** A text message indicating whether the movie was successfully removed and the updated list of favorites.

**Response Example:**
```
The movie with ID 5dbc2a891c8922ba13eb0363 was successfully deleted from the list of favorites. Favorites of
SuperMario123: 5dbc29331c8922ba13eb0361,5dbc27dc1c8922ba13eb035f
```


### Delete user by username

**Endpoint:** /users/[Username]

**Query Parameter:** [Username] of user

**HTTP Method:** DELETE

**Request body data format:** None

**Response body data format:** A text message indicating whether the user account was successfully deleted.

**Response Example:**
```
superHero was deleted
```
- - - -

# Client-side

The UI of myFlix is built using the React library. The interface views will handle data requested by the user through the [REST API endpoints](#Endpoints) defined above.

## Technical Details

**The application...**
* is a single-page application
* uses state routing to navigate between views and share URLs
* gives users option to filter movies
* gives users option to sort movies
* initially uses Parcel as its built tool
* is migrated to create-react-app
* is written using React library and ES2015+
* is written with React Redux
* uses Bootstrap as a UI library for styling and responsiveness
* contains a mix of class components and function components
* is hosted online: [myFlix](https://my-flix-evagrean.herokuapp.com/client)

## Essential Views and Features

### Main view
* returns a list of all movies to the user (each listed item with image, title, description)
* sorting and filtering
* ability to select a movie for more details
* provides links/buttons to see profile data and to log out

### Movie view
* returns data (description, genre, director, image) about a single movie to the user
* allows users to add a movie to their list of favorites

### Login view
* allows users to login with username and password
* provides a link for new users registration view

### Registration view
* allows new users to sign in (username, password, email, birthday)

### Genre view
* returns data about a genre (name, description)
* displays example movies

### Director view
* returns data about a director (name, bio, birth year, death year if existing)
* displays example movies

### Profile view
* allows users to see their profile data (username, email, birthday)

* displays favorite movies
* allows users to remove a movie from their list of favorites
* provides buttons to either update or delete existing account

### Update profile
* allows users to update their user info










