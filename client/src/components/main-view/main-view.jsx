import React from 'react';
import axios from 'axios';
// BrowserRouter used for implementing state-based routing
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import './main-view.scss';

export class MainView extends React.Component {

  constructor() {
    // Call the superclass constructor so react can initialize it
    super();

    // Initialize the state to an empty object so we can destructure (= accessing the state's attributes) it later
    this.state = {
      movies: [],
      // selectedMovie: null,
      user: null,  // default is logged out
      newUser: false
    };
  }

  getMovies(token) {
    axios.get('https://my-flix-evagrean.herokuapp.com/movies', {
      // Adding header for bearer authorization on the frontend
      // Now authenticated requests can be made to API
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    // Persists login data: get value of token from localStorage.
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }


  // onLoggedIn() updates user state of MainView, will be called when user has logged in.
  // Parameter authData gives user and token
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    // Auth information (= user + token) received from handleLogin method has been saved in localStorage.
    // setItem method accepts two arguments (key and value)
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    // Will get the movies from the API once user is logged in
    this.getMovies(authData.token);
  }

  handleRegistration() {
    this.setState({
      newUser: true
    });
  }

  alreadyRegistered() {
    this.setState({
      newUser: false
    });
  }

  handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {
    // If the state isn't initialized, this will throw on runtime before the data is initially loaded
    const { movies, user, newUser } = this.state;
    // Method onLoggedIn() is passed as a prop named onLoggedIn to LoginView
    if (!user && !newUser) return <LoginView onClick={() => this.handleRegistration()} onLoggedIn={user => this.onLoggedIn(user)} />;

    if (newUser) return <RegistrationView onClick={() => this.alreadyRegistered()} onLoggedIn={user => this.onLoggedIn(user)} />

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <Router>
        <div className="main-view">
          <Navbar sticky="top" bg="light" expand="lg" className="mb-3 shadow-sm p-3 mb-5">
            <Navbar.Brand href="http://localhost:1234/" className="navbar-brand">myFlix</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
              <Button variant="outline-secondary mr-1" className="profile-button" onClick={() => { return <ProfileView /> }}>{user}'s Profile</Button>
              <Button variant="outline-primary ml-1" className="logout-button" onClick={() => this.handleLogout()}>Log out</Button>
            </Navbar.Collapse>
          </Navbar>
          <Container className="container-fluid">
            <Row>
              <Route exact path="/" render={() => {
                if (!user && !newUser) return <LoginView onClick={() => this.handleRegistration()} onLoggedIn={user => this.onLoggedIn(user)} />;
                return movies.map(m =>
                  <Col key={m._id} xs={12} sm={6} md={4} lg={3} className="card-margin">
                    <MovieCard key={m._id} movie={m} />
                  </Col>)
              }} />
              <Route path="/register" render={() => <RegistrationView />} />

              <Route path="/movies/:movieId" render={({ match }) =>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
              <Route exact path="/genres/:name" render={({ match }) => {
                if (!movies) return <div className="main-view" />;
                return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
              }
              } />
              <Route exact path="/directors/:name" render={({ match }) => {
                if (!movies) return <div className="main-view" />;
                return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
              }
              } />
              <Route exact path="/users/:Username" render={() => <ProfileView />} />
            </Row>
          </Container>
        </div>
      </Router>
    );
  }
}