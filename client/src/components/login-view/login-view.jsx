import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './login-view.scss';

export function LoginView(props) {
  // Calling useState() method with empty string (= initial value of login variable)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    // prevents the default refresh after submit button has been clicked
    e.preventDefault();
    // Send a request to the server for authentication
    axios.post('https://my-flix-evagrean.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        // This method triggers the onLoggedIn method in MainView and updates user state
        props.onLoggedIn(data);
      })
      .catch(error => {
        return alert('Invalid username or password. Please try again');
      });
  };

  return (
    <div className="login-view">
      <Row className="justify-content-center">
        <Col>
          <Container className="container login-container border border-light shadow p-3 mb-5 rounded py-3 px-3">
            <h3 className="pb-2">Log in to myFlix</h3>
            <Form className="login-form">
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" required value={username} onChange={e => setUsername(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" required value={password} onChange={e => setPassword(e.target.value)} />
              </Form.Group>
              <Row className="justify-content-end">
                <Button className="login-button mr-3 ml-3" variant="primary" type="submit" block onClick={handleLogin}>Login</Button>
              </Row>
            </Form>
          </Container>
          <Container className="mt-4">
            <Row className="d-flex align-items-center justify-content-center">
              <span>Don't have an account?</span>
              <Link to={`/register`}>
                <Button variant="link" className="sign-up-link btn-lg" type="submit">Sign up</Button>
              </Link>

            </Row>
          </Container>
        </Col>
      </Row>
    </div >
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};



