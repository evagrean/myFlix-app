import React from 'react';
import { MainView } from '../main-view/main-view';
import PropTypes from 'prop-types';
import Media from 'react-bootstrap/Media';
import Button from 'react-bootstrap/Button';
import './movie-view.scss';

import { Link } from 'react-router-dom';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    console.log(this.props);
    const { movie, onClick } = this.props;

    if (!movie) return null;

    return (
      <div className="movie-view">
        <Media className="d-flex flex-column flex-md-row align-items-center ml-xs-5">
          <Media.Body>
            <span className="d-flex align-items-center">
              <Link to={`/`}>
                <i className="material-icons">arrow_back_ios</i>
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
      </div >
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};