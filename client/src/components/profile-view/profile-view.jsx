import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

export class ProfileView extends React.Component {

  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      userData: null,
      favorites: []
    };
  }

  componentDidMount() {
    //authentication
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  render() {
    const { username } = this.state;
    return (
      <div className="profile-view">
        <h1 className="display-4">Profile</h1>
        <Row className="justify-content-center">
          <Col xs={10} sm={6} md={4}>
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
        <h3>My favorite movies</h3>
      </div >

    );
  }

}




