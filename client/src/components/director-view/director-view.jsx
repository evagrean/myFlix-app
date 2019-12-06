import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import './director-view.scss';

import { Link } from 'react-router-dom';


export class DirectorView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { director, movies } = this.props;

    if (!director) return null;

    return (
      <div className="director-view">
        <Container>
          <Card style={{ width: '45rem' }} className="border-0 pl-0">
            <Card.Body>
              <span className="d-flex align-items-center">
                <Link to={`/`}>
                  <i className="material-icons">arrow_back_ios</i>
                </Link>
                <h1 className="display-4">{director.Name}</h1>
              </span>
              <Card.Subtitle className="mb-4 text-muted">
                {director.Death === null && <h4>Born in: {director.Birth}</h4>}
                {director.Death !== null && <h4>{director.Birth}- {director.Death}</h4>}
              </Card.Subtitle>
              <Card.Text>{director.Bio}</Card.Text>
            </Card.Body>
          </Card>
          <Container>
            <h4 className="mt-4">Some movies from {director.Name}</h4>
          </Container>
        </Container>

      </div>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string,
    Bio: PropTypes.string,
    Birth: PropTypes.string,
    Death: PropTypes.string
  }).isRequired
};