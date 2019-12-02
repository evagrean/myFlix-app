import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
    console.log(username, password);
    /* Send a request to the server for authentication, 
    then call props.onLoggedIn(username)
    Allows a user to be automatically logged in, regardless of whether or not
    they have correct credentials*/

    props.onLoggedIn(username);
  };

  return (
    <div className="login-view">
      <Row className="justify-content-center">
        <Col xs={10} sm={6} md={4}>
          <Container className="container login-container border border-light rounded py-3 px-3">
            <h3 className="pb-2">Log in to myFlix</h3>
            <Form className="login-form">
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
              </Form.Group>
              <Row className="justify-content-end">
                <Button className="btn-primary mr-3" variant="primary" type="submit" onClick={handleLogin}>Login</Button>
              </Row>
            </Form>
          </Container>
          <Container className="mt-4">
            <Row className="d-flex align-items-center justify-content-center">
              <span>Don't have an account?</span>
              <Button variant="link" type="submit" onClick={() => props.onClick()}>Sign in</Button>
            </Row>
          </Container>
        </Col>
      </Row>

    </div >
  );
}

LoginView.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
