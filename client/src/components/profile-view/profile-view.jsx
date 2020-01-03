import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { user, movies } = this.props;
    console.log(this.props);
    console.log(user);

    if (!user) return null;

    return (
      <div className="profile-view">
        <Container>
          <Card style={{ minwidth: '20rem' }} className="border-0 pl-0">
            <Card.Body>
              <span className="d-flex align-items-center mb-4">
                <Link to={`/`}>
                  <i className="material-icons">arrow_back_ios</i>
                </Link>
                <h1 className="display-4">Profile</h1>
              </span>
              <Card.Text className="mb-4 lead">
                <span className="font-weight-bold">Username: </span>{user.Username} <br />
                <span className="font-weight-bold">Email: </span>{user.Email} <br />
                <span className="font-weight-bold">Birthday: </span>{user.Birthday.slice(0, 10)} <br />
              </Card.Text>
              <Link to={`/update/${user.Username}`}>
                <Button variant="primary" className="update-button">Update my profile</Button>
              </Link>

              <Button variant="primary" className="delete-button ml-2">Delete my profile</Button>
            </Card.Body>
          </Card>
          <Container>
            <h4 className="mt-4">Your favorite movies: </h4>
            {user.Favorites.length === 0 &&
              <div>You have no favorite movies</div>}
            {user.Favorites.length > 0 &&
              <div>
                {user.Favorites}
              </div>

            }

          </Container>
        </Container>
      </div >


    );

  }
}

