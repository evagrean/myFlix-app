import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieCard extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world (in this case: `MainView, as this is what's connected to database via movies endpoint of API)
    const { movie, onClick } = this.props;

    return (
      <Card className="mb-3 h-100" style={{ width: '16rem' }} >
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text className="d-block text-truncate line-clamp">{movie.Description}</Card.Text>
          <Button className="justify-content-left" onClick={() => onClick(movie)} variant="link">Read more</Button>
        </Card.Body>
      </Card>
    );
  }
}

/* static propTypes on MovieCard set to object 
that contains special values provided as utilities by prop-types module.
This values help specify how MovieCard's props should look*/
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};