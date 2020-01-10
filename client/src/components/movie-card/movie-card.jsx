import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';

import { Link } from 'react-router-dom';


export class MovieCard extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world (in this case: `MainView, as this is what's connected to database via movies endpoint of API)
    const { movie } = this.props;

    return (
      <Card className="mb-3 h-100" style={{ width: '16rem' }} >
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Link className="text-muted" to={`/movies/${movie._id}`}>
            <Card.Title>{movie.Title}</Card.Title>
          </Link>
          <Card.Text>{movie.Description.substring(0, 90)}...</Card.Text>
        </Card.Body>
        <Card.Footer className="bg-white border-top-0">
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link" className="read-more-link pl-0">Read more</Button>
          </Link>
        </Card.Footer>
      </Card>
    );
  }
}

/* static propTypes on MovieCard set to object 
that contains special values provided as utilities by prop-types module.
This values help specify how MovieCard's props should look*/
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    ImagePath: PropTypes.string
  }).isRequired
};