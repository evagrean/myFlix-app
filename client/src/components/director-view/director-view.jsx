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

    if (director.Death === null) return (
      <div className="director-view">
        <Container>
          <Card style={{ width: '45rem' }} className="border-0 pl-0">
            <Card.Body>
              <Card.Title className="display-4">{director.Name}</Card.Title>
              <Card.Subtitle className="mb-4 text-muted">
                <h4>Born in {director.Birth}</h4>
              </Card.Subtitle>
              <Card.Text>
                {director.Bio}
              </Card.Text>
              <Link to={`/`}>
                <Button variant="primary">Back to movie list</Button>
              </Link>
            </Card.Body>
          </Card>
          <Container>
            <h4 className="mt-4">Some movies from {director.Name}</h4>
          </Container>
        </Container>

      </div>
    );

    if (director.Death !== null) return (
      <div className="director-view">
        <Container>
          <Card style={{ width: '45rem' }} className="border-0 pl-0">
            <Card.Body>
              <Card.Title className="display-4">{director.Name}</Card.Title>
              <Card.Subtitle className="mb-4 text-muted">
                <h4>{director.Birth} - {director.Death}</h4>
              </Card.Subtitle>
              <Card.Text>
                {director.Bio}
              </Card.Text>
              <Link to={`/`}>
                <Button variant="primary">Back to movie list</Button>
              </Link>
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