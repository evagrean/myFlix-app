import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// BrowserRouter used for implementing state-based routing
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { RouterLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

// #0
import { setMovies } from '../../actions/actions';
import { setUserProfile } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { UpdateView } from '../profile-view/update-view';
import './main-view.scss';

class MainView extends React.Component {

  constructor() {
    // Call the superclass constructor so react can initialize it
    super();

    // Initialize the state to an empty object so we can destructure (= accessing the state's attributes) it later
    this.state = {
      user: null, // default is logged out

    };
  }

  getMovies(token) {
    axios.get('https://my-flix-evagrean.herokuapp.com/movies', {
      // Adding header for bearer authorization on the frontend
      // Now authenticated requests can be made to API
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // #1
        this.props.setMovies(response.data);

      })
      .catch(function (error) {
        alert('An error occured: ' + error);
      });
  }

  getProfileData(token) {
    axios.get(`https://my-flix-evagrean.herokuapp.com/users/${localStorage.getItem('user')}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // #1 setUserProfile
        this.props.setUserProfile(response.data);
      })
      .catch(function (error) {
        alert('An error occured: ' + error);
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
      this.getProfileData(accessToken);
    }
  }




  // onLoggedIn() updates user state of MainView, will be called when user has logged in.
  // Parameter authData gives user and token
  onLoggedIn(authData) {
    this.setState({
      user: authData.user.Username
    });

    // Auth information (= user + token) received from handleLogin method has been saved in localStorage.
    // setItem method accepts two arguments (key and value)
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);



    // Will get the movies from the API once user is logged in
    this.getMovies(authData.token);

    // this.getAllUsers(authData.token);
    this.getProfileData(authData.token);

  }


  handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.setState({
      user: null

    });
    window.open('/', '_self');
  }

  render() {
    // If the state isn't initialized, this will throw on runtime before the data is initially loaded

    // #2
    let { movies, userProfile } = this.props;
    let { user } = this.state;




    // Before the movies and profileData have been loaded
    if (!movies && !userProfile) return <div className="main-view" />;

    if (!user) {
      return (
        <Router>
          <div className="main-view">
            <div className="d-flex bg-light shadow-sm p-3 mb-5">
              <h2 className="d-flex ml-2">myFlix. <span className="check">Check out your favorite movies</span></h2>
            </div>
            <Container className="container">

              <Row className="justify-content-center">
                <Col xs={11} sm={6} md={3}>
                  <Route exact path="/" render={() => < LoginView onLoggedIn={user => this.onLoggedIn(user)} />} />
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col xs={11} sm={6} md={3}>
                  <Route path="/register" render={() => <RegistrationView />} />
                </Col>

              </Row>
            </Container>
          </div>
        </Router >
      );
    } else {
      return (
        <Router>
          <Navbar sticky="top" bg="light" expand="lg" className="mb-3 shadow-sm p-3 mb-5">
            <Navbar.Brand href="http://localhost:1234/" className="navbar-brand">myFlix</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
              <Link component={RouterLink} to={`/users/${user}`} >
                <Button variant="light mr-1" size="lg" className="profile-button">See {user}'s Profile</Button>
              </Link>
              <Button variant="primary ml-1" size="lg" className="logout-button" onClick={() => this.handleLogout()}>Log out</Button>
            </Navbar.Collapse>
          </Navbar>
          <div className="main-view">
            <Container className="container-fluid">
              <Row>
                <Route exact path="/" render={() => <MoviesList movies={movies} />} />
                <Route path="/movies/:movieId" render={({ match }) =>
                  <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
                <Route exact path="/genres/:name" render={({ match }) => {
                  if (!movies || movies.length === 0) return <div className="main-view" />;
                  return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} movies={movies} />
                }
                } />
                <Route exact path="/directors/:name" render={({ match }) => {
                  if (!movies || movies.length === 0) return <div className="main-view" />;
                  return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} movies={movies} />
                }
                } />
                <Route exact path="/users/:Username" render={() => {
                  if (!userProfile) return <div className="main-view" />
                  return <ProfileView userProfile={userProfile} user={user} movies={movies} />
                }}
                />
                <Route exact path="/update/:Username" render={() => <UpdateView user={user} />} />
              </Row>
            </Container>
          </div>
        </Router >

      );
    }
  }
}

// #3
let mapStateToProps = state => {
  return { movies: state.movies, userProfile: state.userProfile }
};

const mapDispatchToProps = {
  setMovies,
  setUserProfile
}

// #4
export default connect(mapStateToProps, mapDispatchToProps)(MainView);

MainView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      Title: PropTypes.string,
      ReleaseYear: PropTypes.string,
      ImagePath: PropTypes.string,
      Description: PropTypes.string,
      Genre: PropTypes.shape({
        Name: PropTypes.string,
        Description: PropTypes.string
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string,
        Bio: PropTypes.string,
        Birth: PropTypes.string,
        Death: PropTypes.string
      }),
      Featured: PropTypes.boolean,
      Actors: PropTypes.array
    })
  ),
  userProfile: PropTypes.shape({
    _id: PropTypes.string,
    Username: PropTypes.string,
    Password: PropTypes.string,
    Birthday: PropTypes.date
  }).isRequired
};