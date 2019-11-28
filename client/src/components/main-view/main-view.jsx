import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import './main-view.scss';

export class MainView extends React.Component {

  constructor() {
    // Call the superclass constructor so react can initialize it
    super();

    // Initialize the state to an empty object so we can destructure (= accessing the state's attributes) it later
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,  // default is logged out
      newUser: false
    };
  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    axios.get('https://my-flix-evagrean.herokuapp.com/movies')
      .then(response => {
        // Assign the result to the state. SetStatus() method used to tell React that component's state has changed
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  // onLoggedIn() updates user state of MainView, will be called when user has logged in
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegistration() {
    this.setState({
      newUser: true
    });
  }

  onSignedIn(user) {
    this.setState({
      user
    });
  }

  alreadyRegistered() {
    this.setState({
      newUser: false
    });
  }

  render() {
    // If the state isn't initialized, this will throw on runtime before the data is initially loaded
    const { movies, selectedMovie, user, newUser } = this.state;
    // Method onLoggedIn() is passed as a prop named onLoggedIn to LoginView
    if (!user && !newUser) return <LoginView onClick={() => this.onRegistration()} onLoggedIn={user => this.onLoggedIn(user)} />;

    if (newUser) return <RegistrationView onClick={() => this.alreadyRegistered()} onLoggedIn={user => this.onLoggedIn(user)} />

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        <h1 className="mt-4 ml-5">MyFlix</h1>
        <Container className="mt-2">
          <Row>
            {selectedMovie
              ? <MovieView movie={selectedMovie} onClick={() => this.onMovieClick(null)} />
              : movies.map(movie => (
                <Col key={movie._id} xs={12} sm={6} md={4} lg={3}>
                  <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
                </Col>
              ))
            }
          </Row>
        </Container>
      </div>
    );
  }
}