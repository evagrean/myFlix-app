import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-bootstrap/Media';
import Button from 'react-bootstrap/Button';
import './movie-view.scss';

import { Link } from 'react-router-dom';
import axios from 'axios';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  addToFavorites(e) {
    const { movie } = this.props;
    e.preventDefault();
    axios.post(
      `https://my-flix-evagrean.herokuapp.com/users/${localStorage.getItem('user')}/Movies/${movie._id}`,
      { username: localStorage.getItem('user') },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(res => {
        alert(`${movie.Title} successfully added to your favorites`);
      })
      // .then(res => {
      //   window.open(`/users/${localStorage.getItem('user')}`)
      // })
      .then(res => {
        document.location.reload(true);
      })
      .catch(error => {
        alert(`${movie.Title} not added to your favorites` + error)
      });
  }


  render() {
    const { movie } = this.props;

    if (!movie) return null;



    return (
      <div className="movie-view">
        <Media className="d-flex flex-column flex-md-row align-items-center ml-xs-5">
          <Media.Body>
            <span className="d-flex align-items-center">
              <Link to={`/`}>
                <i className="material-icons arrow-back">arrow_back_ios</i>
              </Link>
              <h1 className="display-4">{movie.Title}</h1>
            </span>
            <span className="d-flex align-items-center">
              <h4 className="text-muted mt-4 mr-2">Genre: </h4>
              <Link to={`/genres/${movie.Genre.Name}`}>
                <h4 className="genre-link link mt-4">{movie.Genre.Name}</h4>
              </Link>
            </span>
            <span className="d-flex align-items-center mb-4">
              <h4 className="text-muted mr-2">Director: </h4>
              <Link to={`/directors/${movie.Director.Name}`}>
                <h4 className="director-link link">{movie.Director.Name}</h4>
              </Link>
            </span>


            <p className="text-justify">{movie.Description}</p>
          </Media.Body>
          <img
            width={220}
            height={326}
            className="ml-3"
            src={movie.ImagePath}
            alt="movie-poster placeholder"
          />
        </Media>
        <Button className="add-favorite-btn mt-4" onClick={e => this.addToFavorites(e)}>
          <span className="d-flex align-items-center">
            <i className="material-icons heart mr-3">favorite</i>
            Add to my favorites
              </span>

        </Button>
      </div >
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
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
    .isRequired
};