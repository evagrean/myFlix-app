import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import './genre-view.scss';

import { Link } from 'react-router-dom';

export class GenreView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { genre, movie } = this.props;

    if (!genre) return null;

    return (
      <div className="genre-view">
        <Container>
          <Card style={{ width: '45rem' }} className="border-0 pl-0">
            <Card.Body>
              <Card.Title className="display-4 mb-4">{genre.Name}</Card.Title>
              <Card.Text>{genre.Description}</Card.Text>
              <Link to={`/`}>
                <Button variant="primary">Back to movie list</Button>
              </Link>
            </Card.Body>
          </Card>
          <Container>
            <h4 className="mt-4">Some movies that belong to {genre.Name}</h4>
          </Container>
        </Container>
      </div>
    );

  }

}