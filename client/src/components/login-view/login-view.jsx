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
      <h1 className="mt-5 ml-5">Log in to myFlix</h1>
      <Container className="login-container" style={{ width: '40%' }} >
        <Form className="login-form">
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Form.Row>
            <Form.Group controlId="formGridButton">
              <Button className="mr-1 btn-primary" variant="primary" type="submit" onClick={handleLogin}>Login</Button>
            </Form.Group>
            <Form.Group controlId="formGridButton">
              <Button className="" variant="outline-primary" type="submit" onClick={() => props.onClick()}>Create new account</Button>
            </Form.Group>
          </Form.Row>
        </Form>
      </Container>
    </div >
  );
}

LoginView.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
