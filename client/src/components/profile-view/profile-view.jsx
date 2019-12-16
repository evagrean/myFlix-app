import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import './profile-view.scss';

export function ProfileView(props) {
  const { username, password, email, birthday, favorites, movies } = props;



  console.log(props);
  console.log(favorites);

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
              Username: {username} <br />
              Email: {email} <br />
              Birthday: {birthday.slice(0, 10)} <br />
            </Card.Text>
            <Link to={`/update/${username}`}>
              <Button variant="primary" className="update-button">Update my profile</Button>
            </Link>

            <Button variant="primary" className="delete-button ml-2">Delete my profile</Button>
          </Card.Body>
        </Card>
        <Container>
          <h4 className="mt-4">Your favorite movies: </h4>
          {favorites.length === 0 &&
            <div>You have no favorite movies</div>}
          {favorites.length > 0 &&
            <div>
              {favorites}
            </div>
          }

        </Container>
      </Container>
    </div >





  );




}
















// Form to insert later when everything runs as expected
// ---------------------------------------------------------------
/* <Row className="justify-content-center">
          <Col>
            <Container className="container register-container border border-light rounded py-3 px-3">
              <Form className="registration-form">
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => createUsername(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => createPassword(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="text" placeholder="Enter your email adress" value={email} onChange={e => createEmail(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicBirthday">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control type="date" placeholder="01/01/1980" value={birthday} onChange={e => createBirthday(e.target.value)} />
                </Form.Group>
                <Row className="justify-content-end">
                  <Button className="mr-3" variant="primary" type="submit">Update</Button>
                </Row>
              </Form>
            </Container>
            <Container className="mt-4">
              <Row className="d-flex align-items-center justify-content-center">
                <span>Want to delete your myFlix account?</span>
                <Button variant="link" type="submit">Unregister</Button>
              </Row>
            </Container>
          </Col>
        </Row>
        <h3>My favorite movies</h3> */


