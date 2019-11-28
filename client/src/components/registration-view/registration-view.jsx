import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './registration-view.scss';

export function RegistrationView(props) {
  const [username, createUsername] = useState('');
  const [password, createPassword] = useState('');
  const [email, createEmail] = useState('');
  const [birthday, createBirthday] = useState('');

  const handleRegister = () => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onLoggedIn(username);
  }

  return (
    <div className="registration-view">
      <h1 className="mt-5 ml-5">Register for myFlix</h1>
      <Container className="register-container" style={{ width: '40%' }}>
        <Form className="register-form">
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter a username" value={username} onChange={e => createUsername(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter a password" value={password} onChange={e => createPassword(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="Enter your email adress" value={email} onChange={e => createEmail(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formBasicBirthday">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control type="date" placeholder="01/01/1980" value={birthday} onChange={e => createBirthday(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formGridButton">
            <Button className="mr-1" variant="primary" type="submit" onClick={handleRegister}>Create account</Button>
          </Form.Group>
          <Form.Group controlId="formGridButton">
            <Form.Text>Already have an account?</Form.Text>
            <Button variant="outline-primary" type="submit" onClick={() => onClick()}>Login</Button>
          </Form.Group>
        </Form>
      </Container>
    </div>

  );
}

RegistrationView.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  birthday: PropTypes.instanceOf(Date),
  onClick: PropTypes.func.isRequired
}