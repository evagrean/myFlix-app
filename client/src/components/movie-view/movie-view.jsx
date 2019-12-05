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
            <h1 className="display-4">{movie.Title}</h1>
            <Link to={`/genres/${movie.Genre.Name}`}>
              <h4 className="genre-link text-muted mt-4">Genre: {movie.Genre.Name}</h4>
            </Link>
            <Link to={`/directors/${movie.Director.Name}`}>
              <h4 className="director-link text-muted mb-4">Director: {movie.Director.Name}</h4>
            </Link>
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
        <Link to={`/`}>
          <Button variant="link" size="lg" className="pl-0">Back to movie list</Button>
        </Link>
      </div>
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