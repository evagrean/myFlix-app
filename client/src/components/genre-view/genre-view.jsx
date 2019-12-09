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
    const { genre } = this.props;
    console.log(this.props);

    if (!genre) return null;

    return (
      <div className="genre-view">
        <Container>
          <Card style={{ minwidth: '20rem' }} className="border-0 pl-0">
            <Card.Body>
              <span className="d-flex align-items-center mb-4">
                <Link to={`/`}>
                  <i className="material-icons">arrow_back_ios</i>
                </Link>
                <h1 className="display-4">{genre.Name}</h1>
              </span>
              <Card.Text>{genre.Description}</Card.Text>
            </Card.Body>
          </Card>
          <Container>
            <h4 className="mt-4">Some movies that belong to {genre.Name}</h4>
          </Container>
        </Container>
      </div >
    );

  }

}