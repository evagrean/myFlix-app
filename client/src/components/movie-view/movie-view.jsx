import React from 'react';
import { MainView } from '../main-view/main-view';
import PropTypes from 'prop-types';
import Media from 'react-bootstrap/Media';
import Button from 'react-bootstrap/Button';

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
        <Media className="d-flex flex-column flex-md-row align-items-center">
          <Media.Body>
            <h5>{movie.Title}</h5>
            <h6 className="text-muted">Genre: {movie.Genre.Name}</h6>
            <h6 className="text-muted">Director: {movie.Director.Name}</h6>
            <p>{movie.Description}</p>
          </Media.Body>
          <img
            width={220}
            height={326}
            className="ml-3"
            src={movie.ImagePath}
            alt="movie-poster placeholder"
          />
        </Media>
        <Button variant="primary" className="btn" onClick={() => onClick()}>Back to movie list</Button>
      </div>
    );

    {/* <img className="movie-poster" src={movie.ImagePath} />
      <div className="movie-title">
        <span className="label">Title: </span>
        <span className="value"></span>
      </div>
      <div className="movie-description">
        <span className="label">Description: </span>
        <span className="value">{movie.Description}</span>
      </div>
      <div className="movie-genre">
        <span className="label">Genre: </span>
        <span className="value">{movie.Genre.Name}</span>
      </div>
      <div className="movie-director">
        <span className="label">Director: </span>
        <span className="value">{movie.Director.Name}</span>
      </div>
      <div className="go-back">
        <button className="btn" onClick={() => onClick()}>Back to movie list</button>
      </div> */}


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
  }).isRequired,
  onClick: PropTypes.func.isRequired
};